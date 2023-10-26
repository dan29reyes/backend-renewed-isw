const knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

//Post
async function createAnnounce(announce) {
  const id_announce = await knex("announcements").insert({
    title_announce: announce.title,
    message_announce: announce.message,
    id_sender: announce.sender,
  });

  await knex("announcements_clinics").insert({
    id_announce: id_announce,
    id_clinic: clinic
  })
}

async function updateTitle(id, title_new) {
  return await knex("announcements")
    .update("id_announce", id)
    .where("title_announce", title_new);
}

async function updateMessage(id, message_new) {
  return await knex("aanouncements")
    .update("id_announce", id)
    .where("message_announce", message_new);
}

async function updateLeido(id, patient, leido){
  await knex("announcements_patient")
  .update("state_announce", leido)
  .where({id_announce: id, id_patient: patient})
}

//Get
async function GetAnnouncementsForPsychologist(id_psychologist) {
  const announcements = await knex("announcements")
    .select("*")
    .where("id_sender", id_psychologist);
  announcements = JSON.stringify(announcements);
  return JSON.parse(announcements);
}

async function GetAnnouncementsForClinic(id_clinic) {
  const announcements = await knex
    .select("announcements.*")
    .table("announcements")
    .innerJoin(
      "announcements_clinics",
      "announcements.id_announce = announcements_clinics.id_announce and announcements_clinics.id_clinic = " +
        id_clinic
    );
  announcements = JSON.stringify(announcements);
  return JSON.parse(announcements);
}

async function GetAnnouncementesForPatient(id_patient) {
  const announcements = await knex
    .select("announcements.*")
    .table("announcements")
    .innerJoin(
      "announcements_patient",
      "announcements.id_announce = announcements_patient.id_announce and announcements_patient.id_patient = " +
        id_patient
    );
  announcements = JSON.stringify(announcements);
  return JSON.parse(announcements);
}

//Delete
async function DeleteAnnounce(id_announce) {
  await knex("announcements")
  .where("id_announce", id_announce)
  .del();
}

module.exports = {
  createAnnounce,
  updateMessage,
  updateTitle,
  updateLeido,
  GetAnnouncementesForPatient,
  GetAnnouncementsForClinic,
  GetAnnouncementsForPsychologist,
  DeleteAnnounce
};