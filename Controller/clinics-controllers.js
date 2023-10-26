const clinicServices = require("../Service/clinics-services");

async function createClinic(req, res) {
  const { id, course, psychologist } = req.body;
  try {
    if (clinicServices.findExistingClinicId(id)) {
      await clinicServices.createClinic({ id, course, psychologist });
      res.send({ message: "Se ha creado la clinica exitosamente" });
    } else {
      res.send({ message: "Ya existe una clinica con este id" });
    }
  } catch (err) {
    res.send({ message: err.message });
  }
}

async function setActiveClinic(req, res) {
  const { id, active } = req.body;
  try {
    await clinicServices.setActiveClinic({ id, active });
    res.send({ message: "Se ha actualizado la clinica exitosamente" });
  } catch (err) {
    res.send({ message: err.message });
  }
}

async function changePsychologist(req, res) {
  const { id, psychologist } = req.body;
  try {
    await clinicServices.changePsychologist({ id, psychologist });
    res.send({ message: "Se ha actualizado la clinica exitosamente" });
  } catch (err) {
    res.send({ message: err.message });
  }
}

async function viewAllCourseClinics(req, res) {
  const { id } = req.body;
  try {
    const clinics = await clinicServices.viewAllCourseClinics(id);
    res.send(clinics);
  } catch (err) {
    res.send({ message: err.message });
  }
}

async function viewAllPsychologistClinics(req, res) {
  const { id } = req.body;
  try {
    const clinics = await clinicServices.viewAllPsychologistClinics(id);
    res.send(clinics);
  } catch (err) {
    res.send({ message: err.message });
  }
}

module.exports = {
  createClinic,
  viewAllCourseClinics,
  viewAllPsychologistClinics,
  setActiveClinic,
  changePsychologist,
};
