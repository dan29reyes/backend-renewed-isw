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
      await knex
        .select("id", "id_account", "name")
        .table("users")
        .where("role", "DOCENTE")
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

async function DeleteAdmin(id) {
  return knex("users").where("id", id).del();
}

async function updateAdmin(id, name) {
  await knex("users").where("id", id).update({
    name: name,
  });
  return;
}

async function registerAdmin(user) {
  return knex("users").insert({
    id_account: user.human_talent,
    role: user.role,
    name: user.name,
    email: user.email,
    password: user.encryptedPassword,
    salt: user.salt,
    active: user.active,
  });
}

async function findExistingEmail(email) {
  const email_find = JSON.parse(
    JSON.stringify(await knex.select().table("users").where("email", email))
  );
  console.log(email_find)
  return email_find;
}

async function ExisteUser(id) {
  const user = JSON.parse(
    JSON.stringify(await knex.select().table("users").where("id", id))
  );
  return user;
}

async function ExisteTeacher(id) {
  const user = JSON.parse(
    JSON.stringify(
      await knex
        .select()
        .table("users")
        .where("id", id)
        .andWhere("role", "DOCENTE")
    )
  );
  return user;
}

module.exports = {
  DeleteAdmin,
  registerAdmin,
  updateAdmin,
  findExistingEmail,
  getStudents,
  getTeachers,
  getAdmins,
  ExisteUser,
  getUsers,
  ExisteTeacher,
};
