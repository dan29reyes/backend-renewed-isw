const express = require("express");
const router = express.Router();

const clinicControllers = require("../Controller/clinics-controllers");

//Post
router.post("/create", clinicControllers.createClinic);
router.post("/setActive", clinicControllers.setActiveClinic);
router.post("/changePsychologist", clinicControllers.changePsychologist);
router.post("/viewAllSectionClinics", clinicControllers.viewAllSectionClinics);
router.post("/viewAllPsychologistClinics",clinicControllers.viewAllPsychologistClinics);

//Get
router.get("/viewAll", clinicControllers.viewAllClinics)

module.exports = router;
