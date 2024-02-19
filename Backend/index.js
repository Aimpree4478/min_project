const express = require('express');
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

app.get('/', (req, res) => {
    res.json({msg: 'hello'})
});


app.get('/users', (req, res) => {
    const sql = "SELECT * FROM user";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/addUser', (req, res) => {
    const { Username, Email, Link } = req.body; // Assuming your request body contains username, email, and link fields

    const sql = "INSERT INTO user (username, email, link) VALUES (?, ?, ?)";
    db.query(sql, [Username, Email, Link], (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: 'User added successfully', id: result.insertId });
    });
});

app.delete('/deleteUser', (req, res) => {
    const { Username } = req.body;
  
    const sql = "DELETE FROM user WHERE Username = ?";
    db.query(sql, [Username], (err, result) => {
      if (err) return res.json(err);
      return res.json({ message: 'User deleted successfully', affectedRows: result.affectedRows });
    });
  });

const port = 500;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
