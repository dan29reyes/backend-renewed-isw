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

//GETS
async function getUsers() {
  const admins = JSON.parse(JSON.stringify(await knex.select().table("users")));

  return admins;
}

async function getAdmins() {
  const admins = JSON.parse(
    JSON.stringify(await knex.select().table("users").where("role", "ADMIN"))
  );

  return admins;
}

async function getTeachers() {
  const teacher = JSON.parse(
    JSON.stringify(
      await knex.select("id","id_account","name").table("users").where("role", "DOCENTE")
    )
  );

  return teacher;
}

async function getStudents() {
  const teacher = JSON.parse(
    JSON.stringify(
      await knex.select("name").table("users").where("role", "ESTUDIANTE")
    )
  );

  return teacher;
}

async function findExistingEmail(email) {
  const email_find = JSON.parse(
    JSON.stringify(
      await knex.select().table("users").where("email", "=", email)
    )
  );
  
  return email_find;
}

//DELETES
async function DeleteAdmin(id) {
  return knex("users").where("id", id).del();
}

//UPDATES
async function updateAdmin(id, name) {
  await knex("users").where("id", "=", id).update({
    name: name,
  });
  return;
}

//INSERTS
async function registerAdmin(user) {
  return knex("users").insert({
    human_talent: user.human_talent,
    role: user.role,
    name: user.name,
    email: user.email,
    password: user.encryptedPassword,
    salt: user.salt,
    active: user.active,
  });
}

module.exports = {
  getAdmins,
  getUsers,
  getTeachers,
  getStudents,
  DeleteAdmin,
  updateAdmin,
  registerAdmin,
  findExistingEmail,
};
