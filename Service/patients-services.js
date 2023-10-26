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
async function createPatient(patient) {
  await knex("patients").insert({
    id_patient: patient.id,
    id_clinic: patient.clinic,
  });
}

async function updateTreatment(patient) {
  await knex("patients")
    .update({ attended: patient.attended })
    .where({ id_patient: patient.id, id_clinic: patient.clinic });
}

async function updateColor(patient) {
  await knex("patients")
    .update({ color_clinic: patient.color })
    .where({ id_patient: patient.id, id_clinic: patient.clinic });
}

async function changeClinic(patient) {
  await knex("patients")
    .update({ id_clinic: patient.clinic })
    .where("id_patient", patient.id);
}

//GET
async function getClinicsForPatient(id) {
  let clinics = await knex
    .select("clinics.* as clinic", "patients.color_clinic")
    .table("clinics")
    .innerJoin(
      "patients",
      "patients.id_clinic = clinics.id_clinic and patients.id_patient = " + id
    );
  clinics = JSON.stringify(clinics);
  return JSON.parse(clinics);
}

async function viewClinicPatients(id) {
  let patients = await knex
    .select("users.* as userInfo")
    .table("patients")
    .innerJoin(
      "users",
      "patients.id_patient = users.id_user and patients.id_clinic = " + id
    );
  patients = JSON.stringify(patients);
  return JSON.parse(patients);
}

module.exports = {
  createPatient,
  updateTreatment,
  updateColor,
  changeClinic,
  getClinicsForPatient,
  viewClinicPatients,
};
