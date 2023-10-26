const courseService = require("../Service/course-services");

async function createCourse(req, res) {
  const { id } = req.body;
  try {
    await courseService.createCourse(id);
    res.send({ message: "Se ha creado el curso exitosamente" });
  } catch (error) {
    res.send({ message: "No se ha podido crear el curso" });
  }
}
async function assignTeacher(req, res) {
  const { id, id_teacher } = req.body;
  try {
    await courseService.assignTeacher({ id, id_teacher });
  } catch (error) {
    res.send({ message: "No se ha podido asignar un catedrático al curso" });
  }
}

async function setActiveCourse(req, res) {
  const { id, active } = req.body;
  try {
    await courseService.setActiveCourse({ id, active });
    if (active === 1) {
      res.send({ message: "Se ha habilitado el curso" });
    } else {
      res.send({ message: "El curso ha sido deshabilitado" });
    }
  } catch (error) {
    res.send({ message: "No se ha podido actualizar el estado del curso" });
  }
}

async function getTeacherCourse(req, res) {
  const { email } = req.body;
  try {
    const courses = await courseService.getTeacherCourse(email);
    res.send({
      courses: courses,
    });
  } catch (error) {
    res.send("No se ha podido recuperar los cursos de este docente");
  }
}

async function getAllCourse(req, res) {
  try {
    const courses = await courseService.getAllCourse();
    res.send({
      courses: courses,
    });
  } catch (error) {
    res.send({ message: "No se pudieron recuperar los cursos" });
  }
}

module.exports = {
  createCourse,
  assignTeacher,
  setActiveCourse,
  getTeacherCourse,
  getAllCourse,
};
