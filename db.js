const Pool = require("pg").Pool;
const bcrypt = require('bcrypt');

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "react_public_holidays",
  password: "prince.asamoah@29",
  port: 5432,
});

const createUser = (req, res) => {
  const { fullname, email, password } = req.body;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, function(error, hash) {
    let passwordHash;
    if (error) {
      throw Error(error);
    } else {
      passwordHash = hash;
      db.query(
        "INSERT INTO users (fullname, email, password) VALUES($1, $2, $3)",
        [fullname, email, passwordHash],
        (error, results) => {
          if (error) {
            throw Error(error);
          } else {
            res.sendStatus(200);
          }
        }
      );
    }
  });
};

const getUserByEmail = (req, res) => {
  const {email} = req.query;
  db.query(
    'SELECT * FROM users WHERE email = $1',
    [email],
    (error, results) => {
      if (error) {
        res.send(error);
      } else {
        if (results.rows.length === 0) {
          res.sendStatus(404);
        } else {
          res.status(200).json(results.rows[0]);
        }
      }
    }
  );
}

module.exports = {
  createUser,
  getUserByEmail
}
