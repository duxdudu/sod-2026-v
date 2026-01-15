const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.get('/', (req, res) => {
	res.send('Student API is running. Use /students for CRUD operations.');
});
let students = [
  { id: 1, name: 'Alice', age: 20, major: 'Computer Science' },
  { id: 2, name: 'Bob', age: 22, major: 'Mathematics' },
];

// List all students
app.get('/students', (req, res) => {
	res.json(students);
}); 

// Get a single student by id
app.get('/students/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);   
	const student = students.find(s => s.id === id);
	if (!student) return res.status(404).json({ error: 'Student not found' });
	res.json(student);
});

// Create a new student
app.post('/students', (req, res) => {
	const { name, age, major } = req.body;
	if (!name) return res.status(400).json({ error: 'Name is required' });
	const student = { id: nextId++, name, age: age || null, major: major || null };
	students.push(student);
	res.status(201).json(student);
});

// Update a student by id
app.put('/students/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	const idx = students.findIndex(s => s.id === id);
	if (idx === -1) return res.status(404).json({ error: 'Student not found' });
	const { name, age, major } = req.body;
	const updated = { ...students[idx], name: name ?? students[idx].name, age: age ?? students[idx].age, major: major ?? students[idx].major };
	students[idx] = updated;
	res.json(updated);
});

// Delete a student by id
app.delete('/students/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	const idx = students.findIndex(s => s.id === id);
	if (idx === -1) return res.status(404).json({ error: 'Student not found' });
	students.splice(idx, 1);
	res.status(204).send();
});

app.listen(port, () => {
	console.log(`Student API listening on http://localhost:${port}`);
});

