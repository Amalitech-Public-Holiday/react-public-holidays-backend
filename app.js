const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const { createUser, getUserByEmail } = require('./db');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(
    '<h1 style="text-align:center;margin-top: 5rem">Welcome to React Public Holidays</h1>'
    );
});

app.get('/users', getUserByEmail);
app.post('/users/signup', createUser);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});