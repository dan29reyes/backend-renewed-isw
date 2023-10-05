const express = require("express");
const router = express.Router();

const modulesController = require("../Controller/modules-controller");

router.get("/all", modulesController.getModulos);
router.post("/create", modulesController.createMod);
router.put("/updateName", modulesController.updateModName);
router.put("/updateDes", modulesController.updateModDes);
router.delete("/delete", modulesController.deleteMod);

module.exports = router;
