const announcementControllers = require("../Service/announcement-services");

async function createAnnouncement(req, res) {
  const { title, message, creator, clinic } = req.body;
  try {
    await announcementControllers.createAnnouncement({
      title: title,
      message: message,
      creator: creator,
      clinic: clinic,
    });
    res.send({ message: "Se ha creado el anuncio exitosamente" });
  } catch (error) {
    res.send({ message: "No fue posible crear el anuncio" });
  }
}
async function updateTitle(req, res) {
  const { id, title, editor } = req.body;
  try {
    await announcementControllers.updateTitle({
      id: id,
      title: title,
      editor: editor,
    });
    res.send({
      message: "Se ha actualizado exitosamente el titulo del anuncio",
    });
  } catch (error) {
    res.send({ error: "No fue posible actualizar el titulo del anuncio" });
  }
}

async function updateMessage(req, res) {
  const { id, message, editor } = req.body;
  try {
    await announcementControllers.updateMessage({
      id: id,
      message: message,
      editor: editor,
    });
    res.send({ message: "Se ha actualizado exitosamente el mensaje" });
  } catch (error) {
    res.send({ error: "No fue posible actualizar el mensaje del anuncio" });
  }
}

async function updateLeido(req, res) {
  const { id, patient, leido, editor } = req.body;
  try {
    await announcementControllers.updateLeido({
      id: id,
      patient: patient,
      leido: leido,
      editor: editor,
    });
    res.send({ message: "Se ha actualizado exitosamente el estado" });
  } catch (error) {
    res.send({ error: "No fue posible actualizar el estado del anuncio" });
  }
}

async function GetAnnouncementsForPsychologist(req, res) {
  const { id } = req.body;
  try {
    const announcements =
      await announcementControllers.GetAnnouncementsForPsychologist(id);
    res.send({
      message: "Se ha recuperado exitosamente los anuncios",
      announcementsInfo: announcements,
    });
  } catch (error) {
    res.send({ error: "No fue posible recuperar los anuncios" });
  }
}

async function GetAnnouncementsForClinic(req, res) {
  const { id } = req.body;
  try {
    const announcements =
      await announcementControllers.GetAnnouncementsForClinic(id);
    res.send({
      message: "Se ha recuperado exitosamente los anuncios",
      announcementsInfo: announcements,
    });
  } catch (error) {
    res.send({ error: "No fue posible recuperar los anuncios" });
  }
}

async function GetAnnouncementesForPatient(req, res) {
  const { id } = req.body;
  try {
    const announcements =
      await announcementControllers.GetAnnouncementesForPatient(id);
    res.send({
      message: "Se ha recuperado exitosamente los anuncios",
      announcementsInfo: announcements,
    });
  } catch (error) {
    res.send({ error: "No fue posible recuperar los anuncios" });
  }
}

async function DeleteAnnouncement(req, res) {
  const { id } = req.body;
  try {
    await announcementControllers.DeleteAnnouncement(id);
    res.send({ message: "Se ha borrado exitosamente el anuncio" });
  } catch (error) {
    res.send({ error: "No fue posible borrar " });
  }
}

async function getAnnouncements(req, res) {
  try {
    const announcements = await announcementControllers.getAnnouncements();
    res.send({
      message: "Se ha recuperado exitosamente los anuncios",
      announcementsInfo: announcements,
    });
  } catch (error) {
    res.send({ error: "No fue posible recuperar los anuncios" });
  }
}

module.exports = {
  createAnnouncement,
  updateTitle,
  updateMessage,
  updateLeido,
  GetAnnouncementsForPsychologist,
  GetAnnouncementsForClinic,
  GetAnnouncementesForPatient,
  DeleteAnnouncement,
  getAnnouncements,
};
