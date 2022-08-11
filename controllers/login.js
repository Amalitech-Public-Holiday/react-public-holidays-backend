const db = require("../db");
const bcrypt = require("bcrypt");

const getUserEmailAndPassword = (req, res) => {
    const {email, password} = req.body;
    db.query("SELECT * FROM users WHERE email =$1", [email], (queryError, queryResults) => {
        if (queryError) {
          res.status(500).json({error500: 'Login unsuccessful due to server error, try again!'})
          throw Error(queryError);
        }
        if (queryResults.rows.length !== 0) {
          const user = queryResults.rows[0];
          bcrypt.compare(password, user.password, function(bcryptError, bcryptResults) {
              if (bcryptError) {
                  res.status(500).json({error500: 'Login unsuccessful due to server error, try again!'});
                  throw Error(bcryptError);
              }
              if (bcryptResults) {
                  res.status(200).json({username: user.fullname});
              } else {
                res.status(404).json({error404: 'Email or password is incorrect, try again!'});
              }
          });
        } else {
            res.status(404).json({error404: 'Email or password is incorrect, try again!'});
        }
    });

};

module.exports = {getUserEmailAndPassword};