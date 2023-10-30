const sectionServices = require("../Service/section-services");

//Post
async function createSection(req, res) {
  const { id, course, creator } = req.body;
  try {
    await sectionServices.createSection({ id: id, course: course, creator: creator });
    res.send({ message: "Se ha creado la sección" });
  } catch (error) {
    res.send({ message: "No se ha podido crear la sección" });
  }
}

async function assignTeacher(req, res) {
  const { id, teacher, editor } = req.body;
  try {
    await sectionServices.assignTeacher({ id: id , teacher: teacher, editor: editor });
    res.send({ message: "Se ha asignado un catedrático al curso" })
  } catch (error) {
    res.send({ message: "No se ha podido asignar un catedrático al curso" });
  }
}

async function setActiveSection(req, res) {
  const { id, active, editor } = req.body;
  try {
    await sectionServices.setActiveSection({ id: id, active: active, editor: editor });
    res.send({ message: "Se ha actualizado el estado de la sección" });
  } catch (error) {
    res.send({ message: "No se ha podido activar la sección" });
  }
}

//Get
async function getTeacherSection(req, res) {
  const { id_user } = req.body;
  try {
    const sections = await sectionServices.getTeacherSection(id_user);
    res.send({
      sections: sections,
    });
  } catch (error) {
    res.send("No se ha podido recuperar las secciones");
  }
}

async function getAllSections(req, res) {
  try {
    const sections = await sectionServices.getAllSections();
    res.send({
      sections: sections,
    });
  } catch (error) {
    res.send("No se ha podido recuperar las secciones");
  }
}

module.exports = {
  createSection,
  assignTeacher,
  setActiveSection,
  getTeacherSection,
  getAllSections,
};
