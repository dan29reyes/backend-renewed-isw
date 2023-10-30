const rolesServices = require("../Service/roles-services");

async function createRole(req, res) {
  try {
    const { name, creator } = req.body;
    await rolesServices.createRole({ name: name, creator: creator });
    res.send({ message: "Role created successfully" });
  } catch (error) {
    res.send({ error: error.message });
  }
}

async function assignPrivilegesToRole(req, res) {
  try {
    const { id_role, id_privilege, creator } = req.body;
    await rolesServices.assignPrivilegesToRole(id_role, id_privilege, creator);
    res.send({ message: "Privileges assigned to role successfully" });
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

async function getRolePrivileges(req, res) {
  try {
    const { id } = req.body;
    const rolesPrivileges = await rolesServices.getRolePrivileges(id);
    res.send({ roleInfo: rolesPrivileges });
  } catch (error) {
    res.send({ error: error.message });
  }
}

async function updateRoleName(req, res) {
  try {
    const { id_role, name, editor } = req.body;
    await rolesServices.updateRoleName(id_role, name, editor);
    res.send({ message: "Role name updated successfully" });
  } catch (error) {
    res.send({ error: error.message });
  }
}

async function deleteRole(req, res) {
  try {
    const { id_role } = req.params;
    await rolesServices.deleteRole(id_role);
    res.send({ message: "Rol deleted successfully" });
  } catch (error) {
    res.send({ error: error.message });
  }
}

async function removePrivilegeFromRole(req, res) {
  try {
    const { id_role, id_privilege } = req.body;
    await rolesServices.removePrivilegeFromRole(id_role, id_privilege);
    res.send({ message: "Privilege removed from rol successfully" });
  } catch (error) {
    res.send({ error: error.message });
  }
}

module.exports = {
  createRole,
  assignPrivilegesToRole,
  getRoles,
  getRolePrivileges,
  updateRoleName,
  deleteRole,
  removePrivilegeFromRole,
};
