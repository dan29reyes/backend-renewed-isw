const express = require("express");
const router = express.Router();

const patientsControllers = require("../Controller/patients-controller");

router.post("/create", patientsControllers.createPatient);
router.post("/updateTreatment", patientsControllers.updateTreatment);
router.post("/updateColor", patientsControllers.updateColor);
router.post("/changeClinic", patientsControllers.changeClinic);

router.get("/getClinics", patientsControllers.getClinicsForPatient);
router.get("/getPatients", patientsControllers.viewClinicPatients);

module.exports = router;
