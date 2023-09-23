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

async function getModulos() {
  let modulos = await knex.select("*").from("course");
  modulos = JSON.stringify(modulos);
  return JSON.parse(modulos);
}

//52:10
async function createMod(modulos) {
  return knex("course").insert({
    name: modulos.name,
    description: modulos.description,
  });
}

async function updateModName(id, name) {
  return knex("course").where({ id: id }).update({ name });
}
async function updateModDes(id, description) {
  return knex("course").where({ id: id }).update({ description });
}

async function deleteMod(id) {
  try {
    const modulos = await knex("course").select().where("id", id).first();
    if (!modulos) {
      throw new Error("Modulo not found");
    }

    await knex("course").where("id", id).del();
    console.log("Modulo deleted successfully");
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getModulos,
  createMod,
  updateModName,
  updateModDes,
  deleteMod,
};