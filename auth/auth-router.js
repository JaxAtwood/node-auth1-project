const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/users-model.js");


router.post('/register', (req, res) => {
    const user = req.body;
    const userConfirm = req.body.username;

    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.addUser(user)
        .then(saved => {
                res.status(201).json(saved);
            })
        .catch(error => {
            if (Users.findBy(userConfirm)) {
                // console.log("HERE", userConfirm);
                res.status(409).json({ errorMessage: `Username ${user.username} is already taken.`})
            }
            // console.log(error);
            res.status(500).json(error);
        });
});


router.post("/login", (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = username;
                res.status(200).json({ message: `Welcome ${user.username}!` });
            } else {
                res.status(401).json({ message: "Invalid Credentials" });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
})


router.delete('/logout', (req, res) => {
    if (req.session) {
        
        req.session.destroy((err) => {
            if (err) {
                res.status(400).json({ message: 'error logging out:', error: err });
            } else {
                res.json({ message: 'logged out' });
            }
        });
    } else {
        res.end();
    }
});

module.exports = router;