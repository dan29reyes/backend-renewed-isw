const privilegeServices = require("../Service/privileges-services");

async function createPrivilege(req, res) {
  const { element, privilege, creator } = req.body;
  try {
    if (
      typeof element == "string" &&
      typeof privilege == "number" &&
      typeof creator == "number"
    ) {
      await privilegeServices.createPrivilege({
        element: element,
        privilege: privilege,
        creator: creator,
      });
      res.send({ message: "Se ha creado el privilegio" });
    }
  } catch (e) {
    res.status(500).send({
      error: e.toString(),
    });
  }
}

async function updatePrivilegeElement(req, res) {
  const { id, element, editor } = req.body;
  try {
    if (
      typeof id == "number" &&
      typeof element == "string" &&
      typeof editor == "number"
    ) {
      await privilegeServices.updatePrivilegeElement(id, element, editor);
      res.send({ updatedPrivilegeId: id });
    }
  } catch (e) {
    console.log(e);
  }
}

async function updatePrivilege(req, res) {
  const { id, privilege, editor } = req.body;
  try {
    if (
      typeof id == "number" &&
      typeof privilege == "number" &&
      typeof editor == "number"
    ) {
      await privilegeServices.updatePrivilege(id, privilege, editor);
      res.send({ updatedPrivilegeId: id });
    }
  } catch (e) {
    console.log(e);
  }
}

async function getPrivileges(req, res) {
  try {
    const privileges = await privilegeServices.getPrivileges();
    res.send(privileges);
  } catch (e) {
    res.status(500).send({
      error: e.toString(),
    });
  }
}

async function deletePrivilege(req, res) {
  const { id } = req.body;
  try {
    if (typeof id == "number") {
      await privilegeServices.deletePrivilege(id);
      res.send({ deletedPrivilegeId: id });
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  createPrivilege,
  updatePrivilegeElement,
  updatePrivilege,
  getPrivileges,
  deletePrivilege,
};
