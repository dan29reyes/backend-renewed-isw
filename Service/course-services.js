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

async function createCourse(course) {
  return knex("courses").insert({
    name_course: course.name,
    description_course: course.description,
    user_creator: course.creator,
  });
}

async function updateCourseName(course) {
  return knex("courses")
    .where("id_course", course.id)
    .update({
      name_course: course.name,
      user_editor: course.editor,
      last_modification: new Date(),
    });
}

async function updateCourseDescription(course) {
  return knex("courses")
    .where({ id_course: course.id })
    .update({
      description_course: course.description,
      user_editor: course.editor,
      last_modification: new Date(),
    });
}

async function deleteCourse(id) {
  try {
    return await knex("courses").where("id_course", id).del();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getCourses() {
  let courses = await knex("courses").select("*");
  courses = JSON.stringify(courses);
  return JSON.parse(courses);
}

module.exports = {
  createCourse,
  updateCourseName,
  updateCourseDescription,
  deleteCourse,
  getCourses,
};
