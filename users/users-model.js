const db = require("../data/dbConfig.js");

module.exports = {
  addUser,
  findUsers,
  findBy,
  findUserById,
};

async function addUser(user) {
const [id] = await db("users").insert(user, "id");
  return findUserById(id);
}


function findUsers() {
  return db("users").select("id", "username");
}

function findBy(filter) {
  return db("users").where(filter);
}


function findUserById(id) {
  return db("users")
    .where({ id })
    .first();
}