const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const port = 3000;
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { log } = require("console");
const fs = require("fs");
const bcrypt = require("bcrypt");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/assets/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueId = Math.random().toString(36).substr(2, 15);
    const fileExtension = file.originalname.split(".").pop();
    const newFilename = `${uniqueId}.${fileExtension}`;
    cb(null, newFilename);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 3 * 1024 * 1024 },
});

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

const mysql = require("mysql");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "frankent",
  database: "exams",
});
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
});

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "frankent",
  database: "exams",
  connectionLimit: 10,
});

const saltRounds = 10;

app.post("/auth/admin/login", async (req, res) => {
  const { email, password, remember } = req.body;
  console.log(req.body);
  try {
    const query = "SELECT * FROM user WHERE email = ?";
    db.query(query, [email], async (error, rows) => {
      if (error) {
        console.error(error);
        return res.status(200).json({ error: "Failed to fetch user email" });
      }
      if (rows.length === 0) {
        return res.status(200).json({ error: "Failed to find user email" });
      }

      const user = rows[0];

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(200).json({ error: "Invalid password" });
      }

      if (user.role !== "admin") {
        return res.status(200).json({ error: "Forbidden" });
      }

      const token = jwt.sign(
        { email: user.email, role: user.role },
        "your_secret_key",
        { expiresIn: "1h" }
      );

      console.log(user);

      if (remember) {
        const queryToken = "UPDATE user SET remember_token = ? WHERE id = ?";

        db.query(queryToken, [token, user.id], (error, response) => {
          if (error) {
            return res
              .status(200)
              .json({ error: "Failed to set token in database" });
          }
          return res.json({ token });
        });
      } else {
        return res.json({ token, userId: userId });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(200).json({ error: "Internal Server Error" });
  }
});

app.post("/submit/question/multiple", async (req, res) => {
  const selectedIds = req.body.selectedIds;
  console.log(selectedIds);

  const query = "SELECT path FROM questions WHERE id IN (?)";
  db.query(query, [selectedIds], async (err, results) => {
    if (err) {
      console.error("Error querying image paths:", err);
      return res.status(500).send("Failed to delete questions and images");
    }

    const paths = results.map((result) => result.path);
    // console.log(paths);

    if (paths[0] !== null && paths[0] !== undefined) {
      paths.forEach(async (path) => {
        try {
          await fs.promises.unlink("src/" + path);
          console.log(`Deleted image at path: ${path}`);
        } catch (err) {
          console.error("Error deleting image:", err);
        }
      });
    }
    const deleteQuery = "DELETE FROM questions WHERE id IN (?)";

    db.query(deleteQuery, [selectedIds], (err, result) => {
      if (err) {
        console.error("Error deleting questions:", err);
        return res.status(500).json("Failed to delete questions and images");
      }

      console.log("Deleted questions:", result.affectedRows);
      res.status(200).json("Successfully deleted questions and images");
    });
  });
});

app.post("/submit/answers", (req, res) => {
  const { userId, answers } = req.body;
  // return
  console.log("Received answers from user:", userId, answers);

  const query =
    "INSERT INTO answer (name, answer) VALUES (?, ?) ON DUPLICATE KEY UPDATE answer = ?";
  const values = [userId, JSON.stringify(answers), JSON.stringify(answers)];

  db.query(query, values, (err, result) => {
    if (err) throw err;
    console.log("Answers saved in database for user:", userId);
    res.status(200).json({ message: "Answers received and saved" });
  });
});

app.post("/submit/question", upload.single("file"), async (req, res) => {
  const { question, note, type } = req.body;
  let imagePath = null;

  if (req.file) {
    imagePath = `assets/uploads/${req.file.filename}`;
  }

  const insertQuery =
    "INSERT INTO questions (question, note, type, path) VALUES (?, ?, ?, ?)";
  const insertParams = [question, note, type, imagePath];

  db.query(insertQuery, insertParams, (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Failed to insert question");
    }
    console.log("Question inserted successfully");
    res.status(200).json({ message: "Question inserted successfully" });
  });
});

app.post(
  "/submit/question/update",
  upload.single("file-update"),
  async (req, res) => {
    try {
      console.log(req.file);

      const { id, question_update, note_update, type_update } = req.body;

      let imagePath = null;

      if (req.file) {
        const uniqueId = Math.random().toString(36).substr(2, 15);
        const newFilename = `${uniqueId}.png`;
        imagePath = `assets/uploads/${newFilename}`;

        console.log(imagePath);
      }

      const updateQuery =
        "UPDATE questions SET question = ?, note = ?, type = ?, path = ? WHERE id = ?";
      const updateResult = await new Promise((resolve, reject) => {
        db.query(
          updateQuery,
          [question_update, note_update, type_update, imagePath, id],
          (error, results, fields) => {
            if (error) reject(error);
            resolve(results);
          }
        );
      });
      res.send(JSON.stringify(updateResult));
    } catch (error) {
      console.error(error);
      res.status(500).send("Failed to update question");
    }
  }
);

app.post("/question/delete", (req, res) => {
  const { questionId } = req.body;

  const getPathQuery = "SELECT path FROM questions WHERE id = ?";
  db.query(getPathQuery, [questionId], (getPathError, getPathResults) => {
    if (getPathError) {
      console.error(getPathError);
      return res.status(500).json({ error: "Failed to fetch file path" });
    }

    const filePath = "src/" + getPathResults[0].path;

    // console.log(filePath);

    fs.unlink(filePath, (unlinkError) => {
      if (unlinkError) {
        console.error(unlinkError);
        return res.status(500).json({ error: "Failed to delete file" });
      }

      const deleteQuery = "DELETE FROM questions WHERE id = ?";
      db.query(deleteQuery, [questionId], (deleteError, deleteResults) => {
        if (deleteError) {
          console.error(deleteError);
          return res.status(500).json({ error: "Failed to delete question" });
        }

        return res.json({ message: "Question deleted successfully" });
      });
    });
  });
});

app.get("/fetch/question/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM questions WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching question:", err);
      res.status(500).json({ message: "Error fetching question" });
      return;
    }
    res.json(results[0]);
  });
});

app.post("/fetch/questions/exams", (req, res) => {
  const query = `SELECT * FROM questions`;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching questions exams:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching questions" });
      return;
    }

    res.status(200).json({ questions: results });
  });
});

app.post("/fetch/questions", (req, res) => {
  const { start, end } = req.body;
  const query = `SELECT * FROM questions LIMIT ${end} OFFSET ${start - 1}`;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching questions:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching questions" });
      return;
    }

    res.status(200).json({ questions: results });
  });
});

app.get("/fetch/all/questions", (req, res) => {
  const query = "SELECT * FROM questions";

  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
