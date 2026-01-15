//HOW TO CREATE SERVER USING NODE JS AND EXPRESS JS
const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.PORT || 3002;

let students = [
  { id: 1, name: 'Alice', age: 20, major: 'Computer Science' },
  { id: 2, name: 'Bob', age: 22, major: 'Mathematics' },
];

app.get("/", (req, res) => {
  res.send("Welcome to Backend API");
});
app.get("/students", (req, res) => {
  res.json(students);
});
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
