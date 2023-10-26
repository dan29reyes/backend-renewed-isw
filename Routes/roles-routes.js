const express = require("express");
const router = express.Router();

const rolesController = require("../Controller/roles-controller");

//Post
router.post("/create", rolesController.createRol);
router.post("/assignPrivilegesToRol", rolesController.assignPrivilegesToRol);
router.post("/updateRolName", rolesController.updateRolName);
router.post("/removeRolPrivilege", rolesController.removePrivilegeFromRol);

//Get
router.get("/getRoles", rolesController.getRoles);
router.get("/getRolPrivileges", rolesController.getRolPrivileges);

//Delete
router.delete("/delete", rolesController.deleteRol);

module.exports = router;
