const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);

const UsersRouter = require("./users/users-router.js");
const AuthRouter = require("./auth/auth-router.js");

const server = express();

const sessionsConfiguration = {
    name: 'JaxAPI',
    secret: 'A New Secret Phrase!',
    cookie: {
      maxAge: 3600 * 1000,
      secure: false, 
      httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
  
    store: new knexSessionStore(
      {
        knex: require("./data/dbConfig.js"),
        tablename: "sessions",
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 3600 * 1000
      }
    )
  }

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionsConfiguration));

server.use("/api/users", UsersRouter);
server.use("/api/auth", AuthRouter);

server.get("/", (req, res) => {
    res.send({ message: "Working" });
})

module.exports = server;