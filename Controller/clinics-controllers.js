const clinicServices = require("../Service/clinics-services");

async function createClinic(req, res) {
  const { section, psychologist, creator } = req.body;
  try {
    await clinicServices.createClinic({
      section: section,
      psychologist: psychologist,
      creator: creator,
    });
    res.send({ message: "Se ha creado la clinica exitosamente" });
  } catch (err) {
    res.send({ message: err.message });
  }
}

async function setActiveClinic(req, res) {
  const { id, active, editor } = req.body;
  try {
    await clinicServices.setActiveClinic({
      id: id,
      active: active,
      editor: editor,
    });
    res.send({ message: "Se ha actualizado la clinica exitosamente" });
  } catch (err) {
    res.send({ message: err.message });
  }
}

async function changePsychologist(req, res) {
  const { id, psychologist, editor } = req.body;
  try {
    await clinicServices.changePsychologist({
      id: id,
      psychologist: psychologist,
      editor: editor,
    });
    res.send({ message: "Se ha actualizado la clinica exitosamente" });
  } catch (err) {
    res.send({ message: err.message });
  }
}

async function viewAllSectionClinics(req, res) {
  const { id } = req.body;
  try {
    const clinics = await clinicServices.viewAllSectionClinics(id);
    res.send({ clinicsInfo: clinics });
  } catch (err) {
    res.send({ message: err.message });
  }
}

async function viewAllPsychologistClinics(req, res) {
  const { id } = req.body;
  try {
    const clinics = await clinicServices.viewAllPsychologistClinics(id);
    res.send({ clinicsInfo: clinics });
  } catch (err) {
    res.send({ message: err.message });
  }
}

async function viewAllClinics(req, res) {
  try {
    const clinics = await clinicServices.viewAllClinics();
    res.send({ clinicsInfo: clinics });
  } catch (err) {
    res.send({ message: err.message });
  }
}

module.exports = {
  createClinic,
  viewAllSectionClinics,
  viewAllPsychologistClinics,
  setActiveClinic,
  changePsychologist,
  viewAllClinics,
};
