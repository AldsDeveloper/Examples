const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const port = 3000;
const mysql = require('mysql');
const cors = require('cors');
const { log } = require('console');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/assets/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueId = Math.random().toString(36).substr(2, 15);
    const fileExtension = file.originalname.split('.').pop();
    const newFilename = `${uniqueId}.${fileExtension}`;
    cb(null, newFilename);
  }
});
const upload = multer({ storage: storage , limits: { fileSize: 3 * 1024 * 1024 }});

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'frankent',
  database: 'exams'
});
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.post('/submit/question', upload.single('file'), async (req, res) => {
  const { question, note, type } = req.body;
  const imagePath = `assets/uploads/${req.file.filename}`;

  // console.log(imagePath);
  // console.log(JSON.stringify(req.body));
  // console.log(req.file);
  // return

  const insertQuery = 'INSERT INTO questions (question, note, type, path) VALUES (?, ?, ?, ?)';
  const insertResult = await new Promise((resolve, reject) => {
    db.query(insertQuery, [question, note, type, imagePath], (error, results, fields) => {
      if (error) reject(error);
      resolve(results);
    });
  });
  res.send(JSON.stringify(insertResult));
});

app.post('/submit/question/update', upload.single('file-update'), async (req, res) => {
  try {
    // console.log(req.file);
    // return
    const { id, question_update, note_update, type_update } = req.body;
    const uniqueId = Math.random().toString(36).substr(2, 15);
    const newFilename = `${uniqueId}.png`;
    const imagePath = `assets/uploads/${newFilename}`;



    const insertQuery = 'UPDATE questions SET question = ?, note = ?, type = ?, path = ? WHERE id = ?';
    const insertResult = await new Promise((resolve, reject) => {
      db.query(insertQuery, [question_update, note_update, type_update, imagePath, id], (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
    });
    res.send(JSON.stringify(insertResult));
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to update question');
  }
});


app.post('/question/delete', (req, res) => {
  const { questionId } = req.body;

  const getPathQuery = 'SELECT path FROM questions WHERE id = ?';
  db.query(getPathQuery, [questionId], (getPathError, getPathResults) => {
    if (getPathError) {
      console.error(getPathError);
      return res.status(500).json({ error: 'Failed to fetch file path' });
    }

    const filePath = 'src/' + getPathResults[0].path;

    // console.log(filePath);

    fs.unlink(filePath, (unlinkError) => {
      if (unlinkError) {
        console.error(unlinkError);
        return res.status(500).json({ error: 'Failed to delete file' });
      }

      const deleteQuery = 'DELETE FROM questions WHERE id = ?';
      db.query(deleteQuery, [questionId], (deleteError, deleteResults) => {
        if (deleteError) {
          console.error(deleteError);
          return res.status(500).json({ error: 'Failed to delete question' });
        }

        return res.json({ message: 'Question deleted successfully' });
      });
    });
  });
});


app.post('/question/delete/multiple', (req, res) => {
  const { questionId } = req.body;

  const getPathQuery = 'SELECT path FROM questions WHERE id = ?';
  db.query(getPathQuery, [questionId], (getPathError, getPathResults) => {
    if (getPathError) {
      console.error(getPathError);
      return res.status(500).json({ error: 'Failed to fetch file path' });
    }

    const filePath = 'src/' + getPathResults[0].path;

    // console.log(filePath);

    fs.unlink(filePath, (unlinkError) => {
      if (unlinkError) {
        console.error(unlinkError);
        return res.status(500).json({ error: 'Failed to delete file' });
      }

      const deleteQuery = 'DELETE FROM questions WHERE id = ?';
      db.query(deleteQuery, [questionId], (deleteError, deleteResults) => {
        if (deleteError) {
          console.error(deleteError);
          return res.status(500).json({ error: 'Failed to delete question' });
        }

        return res.json({ message: 'Question deleted successfully' });
      });
    });
  });
});



app.get('/fetch/question/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM questions WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching question:', err);
      res.status(500).json({ message: 'Error fetching question' });
      return;
    }
    res.json(results[0]);
  });
});

app.post('/fetch/questions', (req, res) => {
  console.log(res);
  const query = 'SELECT * FROM questions';

  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(port, () => { console.log(`Server is running on port ${port}`); });
