const moduleServices = require("../Service/modules-services");

async function createModule(req, res) {
  const { name, description } = req.body;

  try {
    await moduleServices.createModule({ name, description });
    res.send({ message: "Se ha creado el modulo exitosamente" });
  } catch (error) {
    res.send({ error: "No se pudo crear el modulo" });
  }
}

async function updateModuleName(req, res) {
  const { id_module, name } = rqe.body;

  try {
    await moduleServices.updateModuleName({ id_module, name });
  } catch (error) {
    res.send({ error: "No fue posible actualizar el nombre del modulo" });
  }
}

async function updateModuleDescription(req, res) {
  const { id_module, description } = req.body;

  try {
    await moduleServices.updateModuleDescription({ id_module, description });
  } catch (error) {
    res.send({ error: "No fue posible actualizar la descripción del modulo" });
  }
}

async function deleteModule(req, res) {
  const { id } = req.body;
  try {
    await moduleServices.deleteModule(id);
    res.send({ message: "Se ha eliminado el modulo exitosamente" });
  } catch (error) {
    res.send({ error: "No fue posible eliminar el modulo" });
  }
}

async function getModules(req, res) {
  try {
    let modulesInfo = await moduleServices.getModules();
    res.send({ modules: modulesInfo });
  } catch (error) {
    res.send({ error: "No fue posible recuperar los modulos" });
  }
}

module.exports = {
  createModule,
  updateModuleDescription,
  updateModuleName,
  deleteModule,
  getModules,
};
