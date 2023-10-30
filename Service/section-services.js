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
  let date = new Date();
  let month = date.getMonth();
  let quarter = month < 4 ? 1 : month < 7 ? 2 : month < 10 ? 3 : 4;
  await knex("sections").insert({
    id_section: section.id,
    id_course: section.course,
    quarter: quarter,
    year: date.getFullYear(),
    user_creator: section.creator,
  });
}

async function assignTeacher(section) {
  return knex("sections").where("id_section", section.id).update({
    id_teacher: section.teacher,
    active_section: 1,
    last_modification: new Date(),
    user_editor: section.editor,
  });
}

async function setActiveSection(section) {
  return knex("sections").where("id_section", section.id).update({
    active_section: section.active,
    last_modification: new Date(),
    user_editor: section.editor,
  });
}

//Get
async function getTeacherSection(id_user) {
  let sections = await knex.raw(`
      SELECT sections.*
      FROM sections
      INNER JOIN users ON users.id_user = sections.id_teacher
      WHERE users.id_user = ?
    `, [id_user]);
  sections = JSON.stringify(sections[0]);
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
