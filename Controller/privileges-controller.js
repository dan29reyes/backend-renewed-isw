const privilegeServices = require("../Service/privileges-services");

const createPrivilege = async (req, res) => {
  const { name } = req.body;
  try {
    if (typeof name == "string") {
      const [id] = await privilegeServices.createPrivilege(req.body);
      res.send({ id });
    }
  } catch (e) {
    res.status(500).send({
      error: e.toString(),
    });
  }
};

const getPrivileges = async (req, res) => {
  try {
    const privileges = await privilegeServices.getPrivileges();
    res.send(privileges);
  } catch (e) {
    res.status(500).send({
      error: e.toString(),
    });
  }
};

const updatePrivilegeName = async (req, res) => {
  const { id, name } = req.body;
  try {
    if (typeof id == "number" && typeof name == "string") {
      await privilegeServices.updatePrivilegeName(id, name);
      res.send({ updatedPrivilegeId: id });
    }
  } catch (e) {
    console.log(e);
  }
};

const deletePrivilege = async (req, res) => {
  const { id } = req.body;
  try {
    if (typeof id == "number") {
      await privilegeServices.deletePrivilege(id);
      res.send({ deletedPrivilegeId: id });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createPrivilege,
  getPrivileges,
  updatePrivilegeName,
  deletePrivilege,
};
