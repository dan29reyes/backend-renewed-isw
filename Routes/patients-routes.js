const express = require("express");
const router = express.Router();

const patientsControllers = require("../Controller/patients-controller");

//Post
router.post("/create", patientsControllers.createPatient);
router.post("/updateStatus", patientsControllers.updateStatus);
router.post("/updateColor", patientsControllers.updateColor);
router.post("/changeClinic", patientsControllers.changeClinic);
router.post("/getClinics", patientsControllers.getClinicsForPatient);
router.post("/getPatients", patientsControllers.viewClinicPatients);

//Get
router.get("/viewAll", patientsControllers.getPatients);

module.exports = router;
