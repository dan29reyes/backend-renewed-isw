const express = require("express");
const router = express.Router();

const clinicControllers = require("../Controller/clinics-controllers");

router.post("/create", clinicControllers.createClinic);
router.post("/setActive", clinicControllers.setActiveClinic);
router.post("/changePsychologist", clinicControllers.changePsychologist);
router.get("/viewAllCourseClinics", clinicControllers.viewAllCourseClinics);
router.get(
  "/viewAllPsychologistClinics",
  clinicControllers.viewAllPsychologistClinics
);

module.exports = router;
