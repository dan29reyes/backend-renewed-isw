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
async function createUser(user) {
  return knex("users").insert({
    name_user: user.name,
    email_user: user.email,
    number_user: user.number,
    password_user: user.encryptedPassword,
    salt_user: user.salt,
  });
}

async function updUserName(user) {
  return knex("users")
    .where("email_user", user.email)
    .update("name_user", user.name);
}

async function updUserEmail(user) {
  return knex("users")
    .where("email_user", user.email)
    .update("email_user", user.newEmail);
}

async function updUserNumber(user) {
  return knex("users")
    .where("email_user", user.email)
    .update("number_user", user.number);
}

async function updUserPassword(user) {
  return await knex("users").where({ email_user: user.email }).update({
    password_user: user.encryptedPassword,
    salt_user: user.salt,
  });
}

async function changeUserActive(user) {
  return knex("users")
    .where("email_user", user.email)
    .update("active_user", user.active);
}

async function assignRole(user) {
  const rol = await knex("roles").select().where("id_rol", user.id_rol).first();
  if (!rol) {
    throw new Error("Rol not found");
  }

  const userInfo = await knex("users")
    .select()
    .where("id_user", user.id_user)
    .first();
  if (!userInfo) {
    throw new Error("User not found");
  }

  return await knex("user_rol").insert({
    id_rol: user.id_rol,
    id_user: user.id_user,
  });
}

async function removeRol(user) {
  try {
    await knex("user_rol")
      .where({ id_user: user.id_user, id_rol: user.id_rol })
      .del();
    console.log("Rol deleted successfully");
  } catch (error) {
    throw new Error(error.message);
  }
}

//Get
async function getUserCredentials(email) {
  let usersCredentials = await knex
    .select("*")
    .from("users")
    .where("email", email);
  usersCredentials = JSON.stringify(usersCredentials);
  return JSON.parse(usersCredentials);
}

async function findExistingEmail(email) {
  let emailExists = await knex
    .select("id_user")
    .from("users")
    .where("email_user", email);
  emailExists = JSON.stringify(emailExists);
  return JSON.parse(emailExists);
}

async function getAllusers() {
  let users = await knex.select("*").from("users");
  users = JSON.stringify(users);
  return JSON.parse(users);
}

module.exports = {
  createUser,
  updUserName,
  updUserEmail,
  updUserNumber,
  updUserPassword,
  changeUserActive,
  assignRole,
  removeRol,
  getUserCredentials,
  findExistingEmail,
  getAllusers,
};
