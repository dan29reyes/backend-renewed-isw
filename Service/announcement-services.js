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
async function createAnnouncement(announcement) {
  const id_announcement = await knex("announcements").insert({
    title_announcement: announcement.title,
    message_announcement: announcement.message,
    user_creator: announcement.creator,
  });

  await knex("announcements_clinics").insert({
    id_announcement: id_announcement,
    id_clinic: announcement.clinic,
  });
}

async function updateTitle(announcement) {
  return await knex("announcements")
    .update({
      title_announcement: announcement.title,
      user_editor: announcement.editor,
      last_modification: new Date(),
    })
    .where("id_announcement", announcement.id);
}

async function updateMessage(announcement) {
  return await knex("announcements")
    .update({
      message_announcement: announcement.message,
      user_editor: announcement.editor,
      last_modification: new Date(),
    })
    .where("id_announcement", announcement.id);
}

async function updateLeido(announcement) {
  await knex("announcements_patient")
    .update({
      state_announcement: announcement.leido,
      user_editor: announcement.editor,
      last_modification: new Date(),
    })
    .where({
      id_announcement: announcement.id,
      id_patient: announcement.patient,
    });
}

async function GetAnnouncementsForPsychologist(user_creator) {
  let announcements = await knex("announcements").select("*").where("user_creator", user_creator);
  announcements = JSON.stringify(announcements);
  return JSON.parse(announcements);
}

async function GetAnnouncementsForClinic(id) {
  let announcements = await knex.raw(
    `
    SELECT announcements.* 
      FROM announcements
        INNER JOIN announcements_clinics ON announcements_clinics.id_announcement = announcements.id_announcement
        AND announcements_clinics.id_clinic = ?
  `,
    [id]
  );
  announcements = JSON.stringify(announcements[0]);
  return JSON.parse(announcements);
}

async function GetAnnouncementesForPatient(id) {
  let announcements = await knex.raw(
    `
      SELECT announcements.*
      FROM announcements
      INNER JOIN announcements_patient ON announcements_patient.id_announcement = announcements.id_announcement
      AND announcements_patient.id_patient = ?
    `,
    [id]
  );
  announcements = JSON.stringify(announcements[0]);
  return JSON.parse(announcements);
}

//Get
async function getAnnouncements() {
  const announcements = await knex("announcements").select("*");
  return announcements;
}

//Delete
async function DeleteAnnouncement(id) {
  await knex("announcements").where("id_announcement", id).del();
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
