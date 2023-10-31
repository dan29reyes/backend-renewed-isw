const express = require("express");
const router = express.Router();

const announcesController = require("../Controller/announcement-controller");

//Post
router.post("/create", announcesController.createAnnouncement)
router.post("/updateTitle", announcesController.updateTitle)
router.post("/updateMessage", announcesController.updateMessage)
router.post("/updateLeido", announcesController.updateLeido)

router.post("/getPatientAnnounces", announcesController.GetAnnouncementesForPatient)
router.post("/getPsychologistAnnounces", announcesController.GetAnnouncementsForPsychologist)
router.post("/getClinicAnnounces", announcesController.GetAnnouncementsForClinic)

//Get
router.get("/viewAll", announcesController.getAnnouncements)

//Delete
router.delete("/delete", announcesController.DeleteAnnouncement)

module.exports = router;
