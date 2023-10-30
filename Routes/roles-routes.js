const express = require("express");
const router = express.Router();

const rolesController = require("../Controller/roles-controller");

//Post
router.post("/create", rolesController.createRole);
router.post("/assignPrivileges", rolesController.assignPrivilegesToRole);
router.post("/updateName", rolesController.updateRoleName);
router.post("/viewPrivileges", rolesController.getRolePrivileges);

//Get
router.get("/viewAll", rolesController.getRoles);

//Delete
router.delete("/delete", rolesController.deleteRole);
router.delete("/deletePrivilege", rolesController.removePrivilegeFromRole);

module.exports = router;
