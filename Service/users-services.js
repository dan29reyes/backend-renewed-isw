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

const getUsersCredentials = async () => {
  let usersCredentials = await knex
    .select("name", "email", "id_account", "role", "active")
    .from("users");
  usersCredentials = JSON.stringify(usersCredentials);

  let patientsCredentials = await knex
    .select("name", "email", "identification", "role", "active")
    .from("patients");
  patientsCredentials = JSON.stringify(patientsCredentials);

  return {
    usersCredentials: JSON.parse(usersCredentials),
    patientsCredentials: JSON.parse(patientsCredentials),
  };
};

async function getUserByID(id_account) {
  let user = await knex
    .select("id_account", "role", "name", "email", "active")
    .from("users")
    .where("id_account", id_account);
  user = JSON.stringify(user);

  return JSON.parse(user);
}

const createUser = async (user) => {
  return knex("users").insert({
    id_account: user.id_account,
    role: user.role,
    name: user.name,
    email: user.email,
    password: user.encryptedPassword,
    salt: user.salt,
    active: user.active,
  });
};

const delUser = async (id_account) => {
  return knex("users").where("id_account", id_account).del();
};

const updUserAdmin = async (user) => {
  await knex("users").where("id_account", user.id_account).update({
    role: user.role,
    active: user.active,
  });
};

const updUserPassword = async (user) => {
  await knex("users").where("id_account", user.id_account).update({
    password: user.password,
    salt: user.salt,
  });
};

const updUserEmail = async (user) => {
  await knex("users").where("id_account", user.id_account).update({
    email: user.email,
  });
};

async function findExistingEmail(email) {
  const email_find = JSON.parse(
    JSON.stringify(await knex.select().table("users").where("email", email))
  );
  return email_find;
}

module.exports = {
  getUsersCredentials,
  getUserByID,
  createUser,
  delUser,
  updUserAdmin,
  findExistingEmail,
  updUserPassword,
  updUserEmail,
};
