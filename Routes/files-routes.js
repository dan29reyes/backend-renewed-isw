const express = require("express");
const router = express.Router();

const fileControllers = require("../Controller/files-controllers")

//Post
router.post("/create", fileControllers.createFile)
router.post("/updateBirthday", fileControllers.updateBirthday)
router.post("/updateAddress", fileControllers.updateAddress)
router.post("/updateCivilStatus", fileControllers.updateCivilStatus)
router.post("/updateMedicalHistory", fileControllers.updateMedicalHistory)
router.post("/updateFirstImpresions", fileControllers.updateFirstImpressions)
router.post("/updateSubstanceUsage", fileControllers.updateSubstanceUsage)
router.post("/updateTreatment", fileControllers.updateTreatment)
router.post("/getFileById", fileControllers.getFileById)
router.post("/getPatientFiles", fileControllers.getPatientFiles)

//Delete
router.delete("/delete", fileControllers.deleteFile)

module.exports = router;