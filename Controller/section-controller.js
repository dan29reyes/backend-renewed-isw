const sectionServices = require("../Service/section-services");

//Post
async function createSection(req, res) {
  const { id, course, creator } = req.body;
  try {
    await sectionServices.createSection({ id, course, creator });
    res.send({ message: "Se ha creado la sección" });
  } catch (error) {
    res.send({ message: "No se ha podido crear la sección" });
  }
}

async function assignTeacher(req, res) {
  const { id, id_teacher } = req.body;
  try {
    await sectionServices.assignTeacher({ id: id , id_teacher: id_teacher });
  } catch (error) {
    res.send({ message: "No se ha podido asignar un catedrático al curso" });
  }
}

async function setActiveSection(req, res) {
  const { id, active } = req.body;
  try {
    await sectionServices.setActiveSection({ id: id, active: active });
  } catch (error) {
    res.send({ message: "No se ha podido activar la sección" });
  }
}

//Get
async function getTeacherSection(req, res) {
  const { email_user } = req.body;
  try {
    const sections = await sectionServices.getTeacherSection(email_user);
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
