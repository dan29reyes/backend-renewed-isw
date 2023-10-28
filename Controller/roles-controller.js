const rolesServices = require("../Service/roles-services");

async function createRol(req, res) {
  try {
    const { name, creator } = req.body;
    await rolesServices.createRol({ name: name, creator: creator });
    res.send({ message: "Rol created successfully" });
  } catch (error) {
    res.send({ error: error.message });
  }
}

async function assignPrivilegesToRol(req, res) {
  try {
    const { id_rol, id_privilege } = req.body;
    await rolesServices.assignPrivilegesToRol(id_rol, id_privilege);
    res.send({ message: "Privileges assigned to rol successfully" });
  } catch (error) {
    res.send({ error: error.message });
  }
}

async function getRoles(req, res) {
  try {
    const rols = await rolesServices.getRoles();
    res.send(rols);
  } catch (error) {
    res.send({ error: error.message });
  }
}

async function getRolPrivileges(req, res) {
  try {
    const id = req.body;
    const rolesPrivileges = await rolesServices.getRolPrivileges(id);
    res.send(rolesPrivileges);
  } catch (error) {
    res.send({ error: error.message });
  }
}

async function updateRolName(req, res) {
  try {
    const { id_rol, name, editor } = req.body;
    await rolesServices.updateRolName(id_rol, name, editor);
    res.send({ message: "Rol name updated successfully" });
  } catch (error) {
    res.send({ error: error.message });
  }
}

async function deleteRol(req, res) {
  try {
    const { id_rol } = req.params;
    await rolesServices.deleteRol(id_rol);
    res.send({ message: "Rol deleted successfully" });
  } catch (error) {
    res.send({ error: error.message });
  }
}

async function removePrivilegeFromRol(req, res) {
  try {
    const { id_rol, id_privilege } = req.body;
    await rolesServices.removePrivilegeFromRol(id_rol, id_privilege);
    res.send({ message: "Privilege removed from rol successfully" });
  } catch (error) {
    res.send({ error: error.message });
  }
}

module.exports = {
  createRol,
  assignPrivilegesToRol,
  getRoles,
  getRolPrivileges,
  updateRolName,
  deleteRol,
  removePrivilegeFromRol,
};
