const express = require("express");
const router = express.Router();

const modulesController = require("../Controller/modules-controller");

router.get("/all", modulesController.getModulos);
router.post("", modulesController.createMod);
router.put("/modNom", modulesController.updateModName);
router.put("/modDes", modulesController.updateModDes);
router.delete("", modulesController.deleteMod);

module.exports = router;
