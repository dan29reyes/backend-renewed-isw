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
async function createRol(rol) {
  return await knex("roles").insert({
    name_rol: rol.name,
  });
}

async function assignPrivilegesToRol(rolId, privilegeId) {
  const rol = await knex("roles").select().where("id_rol", rolId).first();
  if (!rol) {
    throw new Error("Rol not found");
  }

  const privileges = await knex("privileges")
    .select()
    .where("id_privilege", privilegeId);
  if (!privileges) {
    throw new Error("Privileges not found");
  }

  return await knex("roles_privileges").insert({
    id_rol: rolId,
    id_privilege: privilegeId,
  });
}

async function updateRolName(id, name) {
  return knex("roles").where({ id_rol: id }).update({ name_rol: name });
}

//Get
async function getRoles() {
  let rols = await knex.select("*").from("roles");
  rols = JSON.stringify(rols);
  return JSON.parse(rols);
}

async function getRolPrivileges(id) {
  let rolesPrivileges = await knex
    .select("*")
    .from("roles_privileges")
    .where("id_rol", id);
  rolesPrivileges = JSON.stringify(rolesPrivileges);
  return JSON.parse(rolesPrivileges);
}

//Delete
async function deleteRol(id) {
  try {
    const rol = await knex("roles").select().where("id_rol", id).first();
    if (!rol) {
      throw new Error("Rol not found");
    }

    await knex("roles").where("id_rol", id).del();
    console.log("Rol deleted successfully");
  } catch (error) {
    throw new Error(error.message);
  }
}

async function removePrivilegeFromRol(idRol, idPrivilege) {
  try {
    const rol_privilege = await knex("roles_privileges")
      .select()
      .where({
        id_rol: idRol,
        id_privilege: idPrivilege,
      })
      .del();
    console.log("Privilege removed successfully");
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createRol,
  getRoles,
  getRolPrivileges,
  updateRolName,
  deleteRol,
  assignPrivilegesToRol,
  removePrivilegeFromRol,
};
