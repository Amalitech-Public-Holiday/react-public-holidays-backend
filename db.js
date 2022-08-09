const Pool = require("pg").Pool;
const db = new Pool({
  user: "me",
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
