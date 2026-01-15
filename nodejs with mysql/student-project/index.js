//HOW TO CONNECT A BACKEND API TO A MYSQL DATABASE
const express = require("express");
const app = express();
app.use(express.json());

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "school_db"
});

db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("MySQL Connected");
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to Backend API");
});


app.get("/students", (req, res, next) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) return next(err);
    res.json(result);
  });
});


app.get("/students/:id", (req, res, next) => {
  const id = req.params.id;
  const sql = "SELECT * FROM students WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) return next(err);
    if (!results || results.length === 0) return res.status
    (404).json({ error: "Student not found" });
    res.json(results[0]);
  });
});


app.post("/students", (req, res, next) => {
  const { firstName, secondName, email } = req.body;
  if (!firstName || !secondName || !email) {
    return res.status(400).json
    ({ error: "firstName, secondName and email are required" });
  }
  const sql = "INSERT INTO students (firstName, secondName, email) VALUES (?, ?, ?)";

  db.query(sql, [firstName, secondName, email], (err, result) => {
    if (err) return next(err);
    
    res.status(201).json({ id: result.insertId, 
      firstName, secondName, email });
  }); 
});

app.put("/students/:id", (req, res, next) => {
  const { firstName, secondName, email } = req.body;
  const id = req.params.id;
  if (!firstName || !secondName || !email) {
    return res.status(400).json
    ({ error: "firstName, secondName and email are required" });
  }

  const sql = "UPDATE students SET firstName=?, secondName=?, email=? WHERE id=?";

  db.query(sql, [firstName, secondName, email, id], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) return 
     res.status(404).json({ error: "Student not found" });
    res.json({ message: "Student updated" });
  });
});

app.delete("/students/:id", (req, res, next) => {
  const id = req.params.id;

  db.query("DELETE FROM students WHERE id=?", [id], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) 
      return res.status(404)
        .json({ error: "Student not found" });
    res.json({ message: "Student deleted" });
  });
});



app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Something went wrong" });
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
