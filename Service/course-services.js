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
async function createCourse(id) {
  await knex("courses").insert({
    id_module: id,
    quarter: Date.now().quarter(),
    year: Date.now().year(),
  });
}

async function assignTeacher(course) {
  return knex("courses").where({ id_course: course.id }).update({
    id_teacher: course.id_teacher,
    active_course: 1,
  });
}

async function setActiveCourse(course) {
  return knex("courses")
    .where({ id_course: course.id })
    .update({ active_course: course.active });
}

//Get
async function getTeacherCourse(email_user) {
  let courses = await knex
    .select("courses.* as courseInfo")
    .table("users")
    .innerJoin("courses", "users.id_user = courses.id_teacher")
    .where("users.email_user", email_user);
  courses = JSON.stringify(courses);
  return JSON.parse(courses);
}

async function getAllCourse() {
  let courses = await knex.select("*").from("courses");
  courses = JSON.stringify(courses);
  return JSON.parse(courses);
}

module.exports = {
  createCourse,
  assignTeacher,
  setActiveCourse,
  getTeacherCourse,
  getAllCourse,
};
