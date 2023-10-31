const fileServices = require("../Service/files_services");

async function createFile(req, res) {
  const { patient, birthday, address, creator } = req.body;

  try {
    await fileServices.createFile({ patient, birthday, address, creator });
    res.send({ message: "Se ha creado el expediente" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

async function updateBirthday(req, res) {
  const { id, birthday, editor } = req.body;

  try {
    await fileServices.updateBirthday({ id, birthday, editor });
    res.send({ message: "Se ha actualizado la fecha de nacimiento" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

async function updateAddress(req, res) {
  const { id, address, editor } = req.body;

  try {
    await fileServices.updateAddress({ id, address, editor });
    res.send({ message: "Se ha actualizado la dirección" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

async function updateCivilStatus(req, res) {
  const { id, civil_status, editor } = req.body;

  try {
    await fileServices.updateCivilStatus({ id, civil_status, editor });
    res.send({ message: "Se ha actualizado el estado civil" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

async function updateMedicalHistory(req, res) {
  const { id, medical_history, editor } = req.body;

  try {
    await fileServices.updateMedicalHistory({ id, medical_history, editor });
    res.send({ message: "Se ha actualizado el historial médico" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

async function updateFirstImpressions(req, res) {
  const { id, first_impressions, editor } = req.body;

  try {
    await fileServices.updateFirstImpressions({ id, first_impressions, editor });
    res.send({ message: "Se ha actualizado las primeras impresiones" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

async function updateSubstanceUsage(req, res) {
  const { id, substance_usage, editor } = req.body;

  try {
    await fileServices.updateSubstanceUsage({ id, substance_usage, editor });
    res.send({ message: "Se ha actualizado el consumo de sustancias" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

async function updateTreatment(req, res) {
  const { id, treatment, editor } = req.body;

  try {
    await fileServices.updateTreatment({ id, treatment, editor });
    res.send({ message: "Se ha actualizado el plan de tratamiento" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

async function getFileById(req, res){
  const { id } = req.body;

  try {
    const file = await fileServices.getFileById(id);
    res.send({ fileInfo: file, message: "Se ha recuperado la información del archivo" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

async function getPatientFiles(req, res){
  const { id } = req.body;

  try{
    const file = await fileServices.getPatientFiles(id);
    res.send({ fileInfo: file, message: "Se han recuperado los archivos del paciente" })
  }catch(error){
    res.send({
      message: "No fue posible recuperar los archivos del paciente",
      error: error.message
    })
  }
}

async function deleteFile(req, res){
  const { id } = req.body;

  try{
    await fileServices.deleteFile(id);
    res.send({ message: "Se ha eliminado el archivo" })
  }catch(error){
    res.send({
      message: "No fue posible eliminar el archivo",
      error: error.message
    })
  }
}

module.exports = {
  createFile,
  updateBirthday,
  updateAddress,
  updateCivilStatus,
  updateMedicalHistory,
  updateFirstImpressions,
  updateSubstanceUsage,
  updateTreatment,
  getFileById,
  getPatientFiles,
  deleteFile
};
