const courseServices = require("../Service/course-services");

async function createCourse(req, res) {
  const { name, description, creator } = req.body;

  try {
    await courseServices.createCourse({
      name: name,
      description: description,
      creator: creator,
    });
    res.send({ message: "Se ha creado el curso exitosamente" });
  } catch (error) {
    res.send({ error: "No se pudo crear el curso" });
  }
}

async function updateCourseName(req, res) {
  const { id, name, editor } = req.body;

  try {
    await courseServices.updateCourseName({
      id: id,
      name: name,
      editor: editor,
    });
    res.send({ message: "Se ha actualizado el nombre del curso exitosamente" });
  } catch (error) {
    res.send({ error: "No fue posible actualizar el nombre del curso" });
  }
}

async function updateCourseDescription(req, res) {
  const { id, description, editor } = req.body;

  try {
    await courseServices.updateCourseDescription({
      id: id,
      description: description,
      editor: editor,
    });
    res.send({
      message: "Se ha actualizado la descripcion del curso exitosamente",
    });
  } catch (error) {
    res.send({ error: "No fue posible actualizar la descripcion del curso" });
  }
}

async function deleteCourse(req, res) {
  const { id } = req.body;

  try {
    await courseServices.deleteCourse(id);
    res.send({ message: "Se ha eliminado el curso exitosamente" });
  } catch (error) {
    res.send({ error: "No fue posible eliminar el curso" });
  }
}

async function getCourses(req, res) {
  try {
    const courses = await courseServices.getCourses();
    res.send({
      coursesInfo: courses,
      message: "Se han obtenido los cursos exitosamente",
    });
  } catch (error) {
    res.send({ error: "No fue posible obtener los cursos" });
  }
}

module.exports = {
  createCourse,
  updateCourseName,
  updateCourseDescription,
  deleteCourse,
  getCourses,
};
