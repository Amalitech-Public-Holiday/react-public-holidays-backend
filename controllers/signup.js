const db = require('../db');
const bcrypt = require("bcrypt");

const createUser = (req, res) => {
  const { fullname, email, password } = req.body;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, function (error, hash) {
    let passwordHash;
    if (error) {
      throw Error(error);
    } else {
      passwordHash = hash;
      db.query(
        "INSERT INTO users (fullname, email, password) VALUES($1, $2, $3)",
        [fullname, email, passwordHash],
        (error, results) => {
          if (error.code === 23505) {
            res.send(403).json({error: 'Email already exist, login or signup with another email!'});
            throw error;
          } else {
            res.sendStatus(200);
          }
        }
      );
    }
  });
};

const getUserByEmail = (req, res) => {
  const { email } = req.query;
  console.log(db);
  db.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
    (error, results) => {
      if (error) {
        res.send(error);
        console.log(error);
      } else {
        if (results.rows.length === 0) {
          res.sendStatus(200);
        } else {
          res.status(400).json({message:'Email already exist, login or signup with another email!'});
        }
      }
    }
  );
};

module.exports = {
  createUser,
  getUserByEmail
}
