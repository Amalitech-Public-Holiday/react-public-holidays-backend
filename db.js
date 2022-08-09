const Pool = require("pg").Pool;
const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "react_public_holidays",
  password: "prince.asamoah@29",
  port: 5432,
});

const createUser = (req, res) => {
  const { fullname, email, password } = req.body;
  db.query(
    "INSERT INTO users (fullname, email, password) VALUES($1, $2, $3)",
    [fullname, email, password],
    (error, results) => {
      if (error) console.log(error);
      res.sendStatus(200);
    }
  );
};

const getUserByEmail = (req, res) => {
  const {email} = req.query;
  db.query(
    'SELECT * FROM users WHERE email = $1',
    [email],
    (error, results) => {
      if (error) console.log(error);
      if (results.rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.status(200).json(results.rows[0]);
      }
    }
  );
}

module.exports = {
  createUser,
  getUserByEmail
}
