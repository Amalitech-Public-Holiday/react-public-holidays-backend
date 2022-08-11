const db = require("../db");
const bcrypt = require("bcrypt");

const getUserEmailAndPassword = (req, res) => {
    const {email, password} = req.body;
    db.query("SELECT * FROM users WHERE email =$1", [email], (error, results) => {
        if (error) console.log(error);
        const user = results.rows[0];
        bcrypt.compare(password, user.password, function(error, result) {
            if (error) {
                console.log(error);
                res.status(500).json({error500: 'Login unsuccessful due to server error, try again!'})
            } else {
                if (result) {
                    res.status(200).json({username: user.fullname});
                } else {
                    res.status(404).json({error404: 'Email or password is incorrect, try again!'});
                }
            }
        });
    });

};

module.exports = {getUserEmailAndPassword};