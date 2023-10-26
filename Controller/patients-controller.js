const patientServices = require("../Service/patients-services");

async function createPatient(req, res) {
  const { id, clinic } = req.body;
  try {
    await patientServices.createPatient({ id, clinic });
    res.send({ message: "Se ha establecido al usuario como paciente" });
  } catch (error) {
    res.send({ message: "No se pudo establecer al usuario como paciente" });
  }
}

async function updateTreatment(req, res) {
  const { id, clinic, attended } = req.body;
  try {
    await patientServices.updateTreatment({ id, clinic, attended });
    res.send({
      message: "Se ha actualizado el estado del paciente a " + attended,
    });
  } catch (error) {
    res.send({ message: "No se pudo actualizar el estado del paciente" });
  }
}

async function updateColor(req, res) {
  const { id, clinic, color } = req.body;
  try {
    await patientServices.updateColor({ id, color, clinic });
    res.send({ message: "Se ha actualizado el color de la clinica" });
  } catch (error) {
    res.send({ message: "No se pudo actualizar el color de la clinica" });
  }
}

async function changeClinic(req, res) {
  const { id, clinic } = req.body;
  try {
    await patientServices.changeClinic({ id, clinic });
    res.send({
      message: "Se ha cambiado al paciente " + id + " a la clinica " + clinic,
    });
  } catch (error) {
    res.send({ message: "No se ha podido cambiar de clinica al paciente" });
  }
}

async function getClinicsForPatient(req, res) {
  const { id } = req.body;
  try {
    let clinics = await patientServices.getClinicsForPatient(id);
    res.send({
      clinics: clinics,
      message: "Recuperado exitosamente",
    });
  } catch (error) {
    res.send({
      message: "No se pudo recuperar las clinicas para el paciente " + id,
    });
  }
}

async function viewClinicPatients(req, res) {
  const { id } = req.body;
  try {
    let patients = await patientServices.viewClinicPatients(id);
    res.send({
      patients: patients,
      message: "Recuperado exitosamente",
    });
  } catch (error) {
    res.send({
      message: "No se pudo recuperar los pacientes para la clinica " + id,
    });
  }
}

module.exports = {
  createPatient,
  updateTreatment,
  updateColor,
  changeClinic,
  getClinicsForPatient,
  viewClinicPatients,
};
