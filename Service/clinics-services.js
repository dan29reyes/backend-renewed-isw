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
    id_clinic: clinic.id,
    id_course: clinic.course,
    id_psychologist: clinic.psychologist,
  });
}

async function setActiveClinic(clinic) {
  await knex("clinics")
    .update({
      active_clinic: clinic.active,
    })
    .where("id_clinic", clinic.id);
}

async function changePsychologist(clinic) {
  await knex("clinics")
    .update({
      id_psychologist: clinic.psychologist,
    })
    .where("id_clinic", clinic.id);
}

//Get
async function viewAllCourseClinics(id) {
  let clinics = await knex("clinics").select("*").where(id_course, id);
  clinics = JSON.stringify(clinics);
  return JSON.parse(clinics);
}

async function viewAllPsychologistClinics(id) {
  let clinics = await knex("clinics").select("*").where(id_psychologist, id);
  clinics = JSON.stringify(clinics);
  return JSON.parse(clinics);
}

//Functions
async function findExistingClinicId(id) {
  let clinic = await knex("clinics").select("*").where("id_clinic", id);
  clinic = JSON.stringify(clinic);
  return JSON.parse(clinic);
}

module.exports = {
  createClinic,
  viewAllCourseClinics,
  viewAllPsychologistClinics,
  setActiveClinic,
  changePsychologist,
  findExistingClinicId,
};
