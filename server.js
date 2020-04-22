const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const UsersRouter = require("./users/users-router.js");
const AuthRouter = require("./auth/auth-router.js");

const server = express();

const sessionsConfiguration = {

}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionsConfiguration));

server.use("/api/users", UsersRouter);
// server.use("/api/auth", AuthRouter);

server.get("/", (req, res) => {
    res.send({ message: "Working" });
})

module.exports = server;