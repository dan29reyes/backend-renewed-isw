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

//GETS
const getUsersCredentials = async () => {
  let usersCredentials = await knex
    .select("name", "email", "id_account", "role", "active")
    .from("users");
  usersCredentials = JSON.stringify(usersCredentials);

  let patientsCredentials = await knex
    .select("name", "email", "identification", "role", "active")
    .from("patients");
  patientsCredentials = JSON.stringify(patientsCredentials);

  return {
    usersCredentials: JSON.parse(usersCredentials),
    patientsCredentials: JSON.parse(patientsCredentials),
  };
};

module.exports = {
  getUsersCredentials,
};
