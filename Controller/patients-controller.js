const patientServices = require("../Service/patients-services");

async function createPatient(req, res) {
  const { id, clinic, creator } = req.body;
  try {
    await patientServices.createPatient({ id, clinic, creator });
    res.send({ message: "Se ha establecido al usuario como paciente" });
  } catch (error) {
    res.send({ message: "No se pudo establecer al usuario como paciente" });
  }
}

async function updateStatus(req, res) {
  const { id, clinic, status, editor } = req.body;
  try {
    await patientServices.updateStatus({ id, clinic, status, editor });
    res.send({
      message:
        "Se ha actualizado el estado del paciente a " +
        (status === 0
          ? "En espera"
          : status === 1
          ? "En tratamiento"
          : status === 2
          ? "Tratado"
          : "Cancelado"),
    });
  } catch (error) {
    res.send({ message: "No se pudo actualizar el estado del paciente" });
  }
}

async function updateColor(req, res) {
  const { id, clinic, color, editor } = req.body;
  try {
    await patientServices.updateColor({ id, color, clinic, editor });
    res.send({ message: "Se ha actualizado el color de la clinica" });
  } catch (error) {
    res.send({ message: "No se pudo actualizar el color de la clinica" });
  }
}

async function changeClinic(req, res) {
  const { id, clinic, newClinic, editor } = req.body;
  try {
    await patientServices.changeClinic({ id, clinic, newClinic, editor });
    res.send({
      message:
        "Se ha cambiado al paciente " + id + " a la clinica " + newClinic,
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

async function getPatients(req, res){
  try{
    let patients = await patientServices.getPatients();
    res.send({
      message: "Pacientes recuperados exitosamente",
      patientsInfo: patients
    })
  }catch(error){
    res.send({
      message: "No fue posible recuperar todos los pacientes"
    })
  }
}

module.exports = {
  createPatient,
  updateStatus,
  updateColor,
  changeClinic,
  getClinicsForPatient,
  viewClinicPatients,
  getPatients
};
