const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const port = 3000;
const mysql = require('mysql');
const cors = require('cors');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/assets/public/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueId = Math.random().toString(36).substr(2, 15);
    const fileExtension = file.originalname.split('.').pop();
    const newFilename = `${uniqueId}.${fileExtension}`;
    cb(null, newFilename);
  }
});
const upload = multer({ storage: storage , limits: { fileSize: 3 * 1024 * 1024 }});

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'frankent',
  database: 'exams'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.post('/submit/question', upload.single('file'), async (req, res) => {
  const { question, note, type } = req.body;
  const imagePath = req.file ? req.file.path : null;

  console.log(JSON.stringify(req.body));
  console.log(req.file);
  // return

  const insertQuery = 'INSERT INTO questions (question, note, type, path) VALUES (?, ?, ?, ?)';
  const insertResult = await new Promise((resolve, reject) => {
    connection.query(insertQuery, [question, note, type, imagePath], (error, results, fields) => {
      if (error) reject(error);
      resolve(results);
    });
  });
  res.send(JSON.stringify(insertResult));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
