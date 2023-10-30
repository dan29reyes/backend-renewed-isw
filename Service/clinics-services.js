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
async function createClinic(clinic) {
  await knex("clinics").insert({
    id_section: clinic.section,
    id_psychologist: clinic.psychologist,
    user_creator: clinic.creator
  });
}

async function setActiveClinic(clinic) {
  await knex("clinics")
    .update({
      active_clinic: clinic.active,
      user_editor: clinic.editor,
      last_modification: new Date(),
    })
    .where("id_clinic", clinic.id);
}

async function changePsychologist(clinic) {
  await knex("clinics")
    .update({
      id_psychologist: clinic.psychologist,
      user_editor: clinic.editor,
      last_modification: new Date(),
    })
    .where("id_clinic", clinic.id);
}

async function viewAllSectionClinics(id) {
  let clinics = await knex("clinics").select("*").where("id_section", id);
  clinics = JSON.stringify(clinics);
  return JSON.parse(clinics);
}

async function viewAllPsychologistClinics(id) {
  let clinics = await knex("clinics").select("*").where("id_psychologist", id);
  clinics = JSON.stringify(clinics);
  return JSON.parse(clinics);
}

//Get
async function viewAllClinics() {
  let clinics = await knex("clinics").select("*");
  clinics = JSON.stringify(clinics);
  return JSON.parse(clinics);
}

module.exports = {
  createClinic,
  viewAllSectionClinics,
  viewAllPsychologistClinics,
  setActiveClinic,
  changePsychologist,
  viewAllClinics,
};
