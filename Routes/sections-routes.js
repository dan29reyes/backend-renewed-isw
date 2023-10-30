const express = require("express");
const router = express.Router();

const sectionController = require("../Controller/section-controller");

//Post
router.post("/create", sectionController.createSection);
router.post("/assign", sectionController.assignTeacher);
router.post("/setActive", sectionController.setActiveSection);
router.post("/getTeacherSections", sectionController.getTeacherSection);

//Get
router.get("/getAll", sectionController.getAllSections);

module.exports = router;
