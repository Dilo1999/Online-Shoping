const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.json());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'myapp'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// API to get users
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// API to add a user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, name, email });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
