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

async function GetInfoSectionMon(course_id) {
  const infoSection = JSON.parse(
    JSON.stringify(
      await knex
        .select(
          "sections.id as SectionId",
          "course.name as CourseName",
          "course.uv as UV",
          "sections.year as Year",
          "sections.quarter as Quarter"
        )
        .table("sections")
        .innerJoin("course", "course.id", "sections.course_id")
    )
  );
  //console.log(infoSection);
  return infoSection;
}

async function CreateSection(section) {
  return knex("sections").insert({
    course_id: section.course_id,
    teacher_id: section.teacher_id,
    year: section.year,
    quarter: section.quarter,
  });
}

async function DeleteSection(id) {
  return knex("sections").where("id", id).del(); //delete from table where id=10
}

async function SectionExists(id) {
  const SectionExist = JSON.parse(
    JSON.stringify(await knex.select().table("sections").where("id", id))
  );

  return SectionExist;
}

async function updateSectionCourseId(id, course) {
  await knex("sections").where("id", id).update({
    course_id: course,
  });
  return;
}

async function updateTeacherSection(id, TeacherId) {
  await knex("sections").where("id", id).update({
    teacher_id: TeacherId,
  });
  return;
}

async function updateYearSection(id, newYear) {
  await knex("sections").where("id", id).update({
    year: newYear,
  });
  return;
}

async function updateQuarterSection(id, newQuarter) {
  await knex("sections").where("id", id).update({
    quarter: newQuarter,
  });
  return;
}
module.exports = {
  getSections,
  GetInfoSection,
  GetInfoSectionMon,
  CreateSection,
  DeleteSection,
  SectionExists,
  updateSectionCourseId,
  updateQuarterSection,
  updateTeacherSection,
  updateYearSection,

};
