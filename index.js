// Devika Pramod Kumar 2023307505
const express = require('express');
const app = express();


app.use(express.json());


let students = [
  { id: 1, name: "Amit", marks: 85 }
];


function getNextId() {
  if (students.length === 0) return 1;
  return Math.max(...students.map(s => s.id)) + 1;
}


app.get('/students', (req, res) => {
  res.json(students);
});

app.post('/students', (req, res) => {
  const { name, marks } = req.body;

 
  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required and must be a non-empty string.' });
  }
  if (typeof marks !== 'number' || Number.isNaN(marks)) {
    return res.status(400).json({ error: 'Marks is required and must be a number.' });
  }

  const newStudent = {
    id: getNextId(),
    name: name.trim(),
    marks
  };
  students.push(newStudent);

 
  res.status(201).json(newStudent);
});


app.get('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'ID must be a number.' });
  }

  const student = students.find(s => s.id === id);
  if (!student) {
    return res.status(404).json({ error: 'Student not found.' });
  }
  res.json(student);
});


app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Student manager running on http://localhost:${PORT}`);
});
