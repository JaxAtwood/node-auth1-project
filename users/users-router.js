const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/requires-auth-middleware.js"); //this is the middleware that restricts access to any of the routes

router.get("/", restricted, (req, res) => {
  Users.findUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => 
        res.status(404).json({ errorMessage: "You shant pass", err }));
});


module.exports = router;