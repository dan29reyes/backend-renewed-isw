const express = require("express");
const router = express.Router();

const announcesController = require("../Controller/announces-controller");

//Post
router.post("/create", announcesController.createAnnounce)
router.post("/updateTitle", announcesController.updateTitle)
router.post("/updateMessage", announcesController.updateMessage)
router.post("/updateLeido", announcesController.updateLeido)

//Get
router.get("/getPatientAnnounces", announcesController.GetAnnouncementesForPatient)
router.get("/getPsychologistAnnounces", announcesController.GetAnnouncementsForPsychologist)
router.get("/getClinicAnnounces", announcesController.GetAnnouncementsForClinic)

//Delete
router.delete("/delete", announcesController.DeleteAnnounce)

module.exports = router;
