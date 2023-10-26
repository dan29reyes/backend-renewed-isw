const express = require("express");
const router = express();

const modulesControllers = require("../Controller/course-controllers");

router.post("/create", modulesControllers.createModule);
router.post("/updateName", modulesControllers.updateModuleName);
router.post("/updateDescription", modulesControllers.updateModuleDescription);

router.delete("/delete", modulesControllers.deleteModule);

router.get("/viewAll", modulesControllers.getModules);

module.exports = router;
