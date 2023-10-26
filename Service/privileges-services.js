const knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

//Post
async function createPrivilege(privilege) {
  return knex("privileges").insert({
    name_privilege: privilege.name,
  });
}

//Get
async function getPrivileges() {
  let privileges = await knex.select("*").from("privileges");
  privileges = JSON.stringify(privileges);
  return JSON.parse(privileges);
}

//Put
async function updatePrivilegeName(id, name) {
  return knex("privileges")
    .where({ id_privilege: id })
    .update({ name_privilege: name });
}

//Delete
async function deletePrivilege(id) {
  try {
    await knex("privileges").where("id_privilege", id).del();
    console.log("Privilege deleted successfully");
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createPrivilege,
  getPrivileges,
  updatePrivilegeName,
  deletePrivilege,
};
