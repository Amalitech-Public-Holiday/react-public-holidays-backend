const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>Welcome to React Public Holidays</h1>");
});