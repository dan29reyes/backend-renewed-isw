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
    id_elemento: privilege.element,
    privilege: privilege.privilege,
    user_creator: privilege.creator,
  });
}

async function updatePrivilegeElement(id, element, editor) {
  
  return knex("privileges")
    .where({ id_privilege: id })
    .update({
      id_elemento: element,
      last_modification: new Date(),
      user_editor: editor,
    });
}

async function updatePrivilege(id, privilege, editor) {
  return knex("privileges")
    .where({ id_privilege: id })
    .update({
      privilege: privilege,
      last_modification: new Date(),
      user_editor: editor,
    });
}

//Get
async function getPrivileges() {
  let privileges = await knex.select("*").from("privileges");
  privileges = JSON.stringify(privileges);
  return JSON.parse(privileges);
}

//Delete
async function deletePrivilege(id) {
  try {
    await knex("privileges").where("id_privilege", id).del();
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createPrivilege,
  updatePrivilegeElement,
  updatePrivilege,
  getPrivileges,
  deletePrivilege,
};
