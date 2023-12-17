require('dotenv').config();
const express = require('express');

const usersRoutes = require('./routes/users');
const childsRoutes = require('./routes/childs');

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ message: "Hello from NutriWise!" });
});

app.use('/users', usersRoutes);
app.use('/childs', childsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});