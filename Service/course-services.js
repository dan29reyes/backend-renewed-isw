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

async function createModule(module) {
  return knex("modules").insert({
    name_module: module.name,
    description_module: module.description,
  });
}

async function updateModuleName(module) {
  return knex("modules")
    .where({ id_module: module.id_module })
    .update({ name_module: module.name });
}

async function updateModuleDescription(module) {
  return knex("courses")
    .where({ id_module: module.id_module })
    .update({ description_module: module.description });
}

async function deleteModule(id) {
  try {
    return await knex("modules").where("id_module", id).del();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getModules() {
  let modules = await knex("modules").select("*");
  modules = JSON.stringify(modules);
  return JSON.parse(modules);
}

module.exports = {
  createModule,
  updateModuleDescription,
  updateModuleName,
  deleteModule,
  getModules,
};
