const announceControllers = require("../Service/announce-services");

async function createAnnounce(req, res) {
  const { title, message, sender, clinic } = req.body;
  try {
    await announceControllers.createAnnounce({ title, message, sender, clinic });
    res.send({ message: "Se ha creado el anuncio exitosamente" });
  } catch (error) {
    res.send({ message: "No fue posible crear el anuncio" });
  }
}
async function updateTitle(req, res) {
  const { id, title_new } = req.body;
  try {
    await announceControllers.updateTitle({ id, title_new });
    res.send({
      message: "Se ha actualizado exitosamente el titulo del anuncio",
    });
  } catch (error) {
    res.send({ error: "No fue posible actualizar el titulo del anuncio" });
  }
}

async function updateMessage(req, res) {
  const { id, message_new } = req.body;
  try {
    await announceControllers.updateMessage({ id, message_new });
    res.send({ message: "Se ha actualizado exitosamente el mensaje" });
  } catch (error) {
    res.send({ error: "No fue posible actualizar el mensaje del anuncio" });
  }
}

async function updateLeido(req, res){
  const { id, patient, leido } = req.body;
  try{
    await announceControllers.updateLeido({id, patient, leido});
  }catch(error){
    res.send({error: "No fue posible actualizar el estado del anuncio"})
  }
}

async function GetAnnouncementsForPsychologist(req, res) {
  const { id_psychologist } = req.body;
  try {
    const announcements =
      await announceControllers.GetAnnouncementsForPsychologist(
        id_psychologist
      );
    res.send({
      message: "Se ha recuperado exitosamente los anuncios",
      announcements: announcements,
    });
  } catch (error) {
    res.send({ error: "No fue posible recuperar los anuncios" });
  }
}

async function GetAnnouncementsForClinic(req, res) {
  const { id_clinic } = req.body;
  try {
    const announcements = await announceControllers.GetAnnouncementsForClinic(
      id_clinic
    );
    res.send({
      message: "Se ha recuperado exitosamente los anuncios",
      announcements: announcements,
    });
  } catch (error) {
    res.send({ error: "No fue posible recuperar los anuncios" });
  }
}

async function GetAnnouncementesForPatient(req, res) {
  const { id_patient } = req.body;
  try{
    const announcements = await announceControllers.GetAnnouncementesForPatient(id_patient)
    res.send({message: "Se ha recuperado exitosamente los anuncios", announcements: announcements})
  }catch(error){
    res.send({error: "No fue posible recuperar los anuncios"})
  }
}

async function DeleteAnnounce(req, res){
  const { id_announce } = req.body;
  try{
    await announceControllers.DeleteAnnounce(id_announce);
    res.send({message: "Se ha borrado exitosamente el anuncio"})
  }catch(error){
    res.send({error: "No fue posible borrar "})
  }
}

module.exports = {
  createAnnounce,
  updateTitle,
  updateMessage,
  updateLeido,
  GetAnnouncementsForPsychologist,
  GetAnnouncementsForClinic,
  GetAnnouncementesForPatient,
  DeleteAnnounce, 
}