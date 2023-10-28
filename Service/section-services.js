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
async function createSection(section) {
  await knex("sections").insert({
    id_section: section.id,
    id_course: section.course,
    quarter: Date.now().quarter(),
    year: Date.now().year(),
    user_creator: section.creator,
  });
}

async function assignTeacher(section) {
  return knex("sections").where({ id_section: section.id }).update({
    id_teacher: section.teacher,
    active_section: 1,
    last_modification: Date.now(),
    user_editor: section.editor,
  });
}

async function setActiveSection(section) {
  return knex("sections").where({ id_section: section.id }).update({
    active_section: section.active,
    last_modification: Date.now(),
    user_editor: section.editor,
  });
}

//Get
async function getTeacherSection(email_user) {
  let sections = await knex
    .select("sections.*")
    .table("users")
    .innerJoin("sections", "users.id_user = sections.id_teacher")
    .where("users.email_user", email_user);
  sections = JSON.stringify(sections);
  return JSON.parse(sections);
}

async function getAllSections() {
  let sections = await knex.select("*").from("sections");
  sections = JSON.stringify(sections);
  return JSON.parse(sections);
}

module.exports = {
  createSection,
  assignTeacher,
  setActiveSection,
  getTeacherSection,
  getAllSections,
};
