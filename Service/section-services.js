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
async function getSections() {
  const sections = JSON.parse(
    JSON.stringify(
      await knex
        .select(
          "sections.id as SectionId",
          "course.name as CourseName",
          "course.id as CourseId",
          "teacher_id as TeacherId",
          "users.name as Teacher",
          "course.uv as UV",
          "sections.year as Year",
          "sections.quarter as Quarter"
        )
        .table("sections")
        .innerJoin("users", "users.id", "sections.teacher_id")
        .innerJoin("course", "course.id", "sections.course_id")
    )
  );

  return sections;
}

async function GetInfoSection(course_id) {
  const infoSection = JSON.parse(
    JSON.stringify(
      await knex
        .select(
          "sections.id as SectionId",
          "course.name as CourseName",
          "users.name as Teacher",
          "course.uv as UV",
          "sections.year as Year",
          "sections.quarter as Quarter"
        )
        .table("sections")
        .innerJoin("users", "users.id", "sections.teacher_id")
        .innerJoin("course", "course.id", "sections.course_id")
        .where("course.id", course_id)
    )
  );

  return infoSection;
}

//INSERT
async function CreateSection(section) {
  return knex("sections").insert({
    course_id: section.course_id,
    teacher_id: section.teacher_id,
    year: section.year,
    quarter: section.quarter,
  });
}

module.exports = {
  getSections,
  GetInfoSection,
  CreateSection,
};
