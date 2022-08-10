const Client = require("pg").Client;
require("dotenv").config();

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect(err => {
  if (err) {
    console.error('Database Connection Error:', err.stack);
  } else {
    console.log('Database Connected Successfully!')
  }
});

module.exports = db;
