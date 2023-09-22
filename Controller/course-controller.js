const courseService = require("../Service/course-services");

//GETS
async function GetCourses(_, res) {
  const courses = await courseService.GetCourses();
  res.send(courses);
}

module.exports = {
  GetCourses,
};
