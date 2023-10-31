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
async function createUser(user){
  await knex("users").insert({
    name_user: user.name,
    email_user: user.email,
    number_user: user.phone,
    password_user: user.encryptedPassword,
    salt_user: user.salt,
    active_user: user.active,
  });
}

async function createPatient(user) {
  let patientId = await knex("users").insert({
    name_user: user.name,
    email_user: user.email,
    number_user: user.phone,
    password_user: user.encryptedPassword,
    salt_user: user.salt,
  });

  let role_patient = JSON.stringify(await knex("roles").select("id_role").where("name_role", "patient"));
  role_patient = JSON.parse(role_patient)

  await knex("user_role").insert({
    id_user: patientId,
    id_role: role_patient[0].id_role,
  });
}

async function updUserName(user) {
  return knex("users").where("id_user", user.id).update({
    name_user: user.name,
    user_editor: user.editor,
    last_modification: new Date(),
  });
}

async function updUserEmail(user) {
  return knex("users").where("id_User", user.id).update({
    email_user: user.newEmail,
    user_editor: user.editor,
    last_modification: new Date(),
  });
}

async function updUserNumber(user) {
  return knex("users").where("id_user", user.id).update({
    number_user: user.phone,
    user_editor: user.editor,
    last_modification: new Date(),
  });
}

async function updUserPassword(user) {
  return await knex("users").where({ email_user: user.email }).update({
    password_user: user.encryptedPassword,
    salt_user: user.salt,
    user_editor: user.editor,
    last_modification: new Date(),
  });
}

async function changeUserActive(user) {
  return knex("users").where("id_user", user.id).update({
    active_user: user.active,
    user_editor: user.editor,
    last_modification: new Date(),
  });
}

async function assignRole(user) {
  const role = await knex("roles")
    .select("id_role")
    .where("id_role", user.id_role);
  if (!role) {
    throw new Error("Role not found");
  }

  const userInfo = await knex("users")
    .select("id_user")
    .where("id_user", user.id_user);
  if (!userInfo) {
    throw new Error("User not found");
  }

  return await knex("user_role").insert({
    id_role: user.id_role,
    id_user: user.id_user,
  });
}

async function removeRole(user) {
  try {
    await knex("user_role")
      .where({ id_user: user.id_user, id_role: user.id_role })
      .del();
    console.log("Role deleted successfully");
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
  let emailExists = await knex("users")
    .select("*")
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
  createPatient,
  updUserName,
  updUserEmail,
  updUserNumber,
  updUserPassword,
  changeUserActive,
  assignRole,
  removeRole,
  getUserCredentials,
  findExistingEmail,
  getAllusers,
};
