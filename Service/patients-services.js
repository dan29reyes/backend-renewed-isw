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
    user_creator: patient.creator,
  });
}

async function updateStatus(patient) {
  await knex("patients")
    .update({
      status: patient.status,
      user_editor: patient.editor,
      last_modification: new Date(),
    })
    .where({
      id_patient: patient.id,
      id_clinic: patient.clinic,
    });
}

async function updateColor(patient) {
  await knex("patients")
    .update({
      color_clinic: patient.color,
      user_editor: patient.editor,
      last_modification: new Date(),
    })
    .where({
      id_patient: patient.id,
      id_clinic: patient.clinic,
    });
}

async function changeClinic(patient) {
  await knex("patients")
    .update({
      id_clinic: patient.newClinic,
      user_editor: patient.editor,
      last_modification: new Date(),
    })
    .where({
      id_patient: patient.id,
      id_clinic: patient.clinic,
    });
}

async function getClinicsForPatient(id) {
  let clinics = await knex.raw(
    `
      SELECT clinics.*,  patients.color_clinic
        FROM clinics
          INNER JOIN patients 
            ON patients.id_clinic = clinics.id_clinic 
              AND patients.id_patient = ?
    `,
    [id]
  );
  clinics = JSON.stringify(clinics[0]);
  return JSON.parse(clinics);
}

async function viewClinicPatients(id) {
  let patients = await knex.raw(
    `
      SELECT users.id_user, users.name_user, users.email_user, users.number_user, users.active_user, users.creation_date
        FROM patients
          INNER JOIN users
            ON patients.id_patient = users.id_user and patients.id_clinic = ?
    `,
    [id]
  );
  patients = JSON.stringify(patients[0]);
  return JSON.parse(patients);
}

//GET
async function getPatients() {
  let patients = await knex("patients").select("*");
  patients = JSON.stringify(patients);
  return JSON.parse(patients);
}

module.exports = {
  createPatient,
  updateStatus,
  updateColor,
  changeClinic,
  getClinicsForPatient,
  viewClinicPatients,
  getPatients,
};
