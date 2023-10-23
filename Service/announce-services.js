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
async function GetAnnouncesForAll() {
  const announcements = JSON.parse(
    JSON.stringify(
      await knex
        .select(
          "announces.id as AnnounceId",
          "announces.message as Message",
          "announces.title as Title",
          "announces.creation_date as Date"
        )
        .table("announces")
    )
  );

  return announcements;
}

async function GetAnnouncesForSections() {
  const announcements = JSON.parse(
    JSON.stringify(
      await knex
        .select(
          "announces.id as AnnounceId",
          "announces.message as Message",
          "announces.title as Title",
        )
        .table("announces")
        .innerJoin("announces_d", "announces.id", "announces_d.announce_id")
        .whereNotNull("announces_d.section_id")
    )
  );

  return announcements;
}

async function GetAnnouncesForUsers() {
  const announcements = JSON.parse(
    JSON.stringify(
      await knex
        .select(
          "announces.id as AnnounceId",
          "announces.message as Message",
          "announces.title as Title"
        )
        .table("announces")
        .innerJoin("announces_d", "announces.id", "announces_d.announce_id")
        .whereNotNull("announces_d.user_id")
    )
  );

  return announcements;
}

async function GetAnnouncesForUser(id) {
  const announcements = JSON.parse(
    JSON.stringify(
      await knex
        .select(
          "announces.id as AnnounceId",
          "announces.message as Message",
          "announces.title as Title"
        )
        .table("announces")
        .innerJoin("announces_d", "announces.id", "announces_d.announce_id")
        .where("announces_d.user_id", id)
    )
  );

  return announcements;
}

async function GetAnnouncesForSection(id) {
  const announcements = JSON.parse(
    JSON.stringify(
      await knex
        .select(
          "announces.id as AnnounceId",
          "announces.message as Message",
          "announces.title as Title"
        )
        .table("announces")
        .innerJoin("announces_d", "announces.id", "announces_d.announce_id")
        .where("announces_d.section_id", id)
    )
  );

  return announcements;
}

async function CreateAnnounce(announce) {
  //poner info a la announce table
  const idAnnounce = await knex("announces")
    .insert({
      message: announce.message,
      title: announce.title,
    })

  //poner a  tabla externa
  await knex("announces_d").insert({
    announce_id: idAnnounce,
    section_id: announce.section_id,
    user_id: announce.user_id,
  });
}

async function DeleteAnnounce_d(announce_id) {
  return knex("announces_d").where("announce_id", announce_id).del();
}
async function DeleteAnnounce(announce_id) {
  return knex("announces").where("id", announce_id).del();
}

async function ExistAnnounce(id) {
  const announce = JSON.parse(
    JSON.stringify(await knex.select().table("announces").where("id", id))
  );
  return announce;
}

async function ExistSectionAnnounce(id) {
  const announce = JSON.parse(
    JSON.stringify(
      await knex.select().table("announces_d").where("section_id", id)
    )
  );

  return announce;
}

async function updateTitle(id_announces, title_new) {
   await knex('announces')
    .where({ id: id_announces })
    .update({ title: title_new })
   
  return;
}

async function updateDescrip(id, description_new) {
  await knex("announces")
    .where(id, id)
    .update({ message: description_new });
  return;
}

module.exports = {
  CreateAnnounce,
  GetAnnouncesForSection,
  GetAnnouncesForUser,
  GetAnnouncesForSections,
  GetAnnouncesForAll,
  GetAnnouncesForUsers,
  DeleteAnnounce,
  ExistAnnounce,
  DeleteAnnounce_d,
  updateDescrip,
  updateTitle,
  ExistSectionAnnounce,
};
