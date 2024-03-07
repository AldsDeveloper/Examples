const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const mysql = require('mysql');

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
const db = mysql.createConnection({host:'127.0.0.1', user:'root', password:'frankent', database:'exams'});
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});




app.post('/submit/questions', (req, res) => {
  const { questions } = req.body;

  if (!questions || !Array.isArray(questions)) {
    return res.status(400).json({ error: 'Invalid questions data' });
  }

  const values = questions.map((question) => [question.id, question.content, question.isCode ? 1 : 0]);

  const sql = 'INSERT INTO questions (id, content, code) VALUES ? ON DUPLICATE KEY UPDATE content = VALUES(content), code = VALUES(code)';

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Error updating questions: ' + err.stack);
      return res.status(500).json({ error: 'Failed to update questions' });
    }
    res.status(200).json({ message: 'Questions updated successfully' });
  });
});

app.put('/update/question/:id', (req, res) => {
  const questionId = req.params.id;
  const { isCode } = req.body;

  const sql = 'UPDATE questions SET code = ? WHERE id = ?';
  db.query(sql, [isCode ? 1 : 0, questionId], (err, result) => {
    if (err) {
      console.error('Error updating question: ' + err.stack);
      return res.status(500).json({ error: 'Failed to update question' });
    }
    res.status(200).json({ message: 'Question updated successfully' });
  });
});



app.delete('/delete/question/:id', (req, res) => {
  const questionId = req.params.id;

  const sql = 'DELETE FROM questions WHERE id = ?';

  db.query(sql, [questionId], (err, result) => {
    if (err) {
      console.error('Error deleting question: ' + err.stack);
      return res.status(500).json({ error: 'Failed to delete question' });
    }
    res.status(200).json({ message: 'Question deleted successfully' });
  });
});


// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'src/assets/public/uploads');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const imageFilter = function (req, file, cb) {
//   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//     return cb(new Error('Only image files are allowed!'), false);
//   }
//   cb(null, true);
// };

// const upload = multer({ storage: storage, fileFilter: imageFilter });

// app.post('/upload', upload.single('image'), (req, res) => {
//   if (req.file) {
//     return res.status(200).json({ imageUrl: 'http://localhost:4200/' + req.file.path });
//   } else {
//     return res.status(400).json({ error: 'Failed to upload image' });
//   }
// });

app.post('/fetch/questions', (req, res) => {
  const query = 'SELECT * FROM questions';

  db.query(query, (err, results) => {
    if (err) throw err;
    // console.log('Questions retrieved from database');
    res.json(results);
  });
});

app.post('/submit/answers', (req, res) => {
  const { userId, answers } = req.body;
  console.log('Received answers from user:', userId, answers);

  const query = 'INSERT INTO answer (name, content) VALUES (?, ?) ON DUPLICATE KEY UPDATE content = ?';
  const values = [userId, JSON.stringify(answers), JSON.stringify(answers)];

  db.query(query, values, (err, result) => {
    if (err) throw err;
    console.log('Answers saved in database for user:', userId);
    res.status(200).json({ message: 'Answers received and saved' });
  });
});

app.post('/check/questions', (req, res) => {
  const query = 'SELECT * FROM questions WHERE id = 1';

  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// สำหรับ Fetch API ดูข้อมูลคำถามและคำตอบรายบุคคล
app.post('/fetch/info', (req, res) => {
  const userId = req.body.userId;

  const query = `
                  SELECT
                    a.name AS userId,
                    q.content AS questions,
                    a.content AS answers,
                    a.created_at AS submittedAt
                  FROM answer a
                  INNER JOIN questions q ON a.id = q.id
                  WHERE a.name = ?
                `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching answers:', err);
      res.status(500).json({ message: 'Error fetching answers' });
      return;
    }

    const transformedResults = results.map(row => {
      return {
        userId: row.userId,
        questions: JSON.parse(row.questions).map((question, index) => {
          return {
            question: question.content,
            answer: JSON.parse(row.answers)[index]
          };
        }),
        submittedAt: row.submittedAt
      };
    });

    res.json(transformedResults);
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
