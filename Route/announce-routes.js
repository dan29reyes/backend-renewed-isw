const express = require("express");
const router = express.Router();

const announces = require("../Controller/announces-controller");

//GETS
router.get("/all", announces.GetAnnounForAll);
router.get("/users", announces.GetAnnounForUsers);
router.get("/sections", announces.GetAnnounForSections);
router.get("/users/search", announces.GetAnnounceUser);
router.get("/sections/search", announces.GetAnnnounceSection);

//DELETE
router.delete("/delete", announces.DeleteAnnounce);

//POST
router.post("/create", announces.CreateAnnounce);
router.post("/update/title", announces.UpdateAnnounceTitle);
router.post("/update/Descrip", announces.UpdateAnnounceDescrip);

module.exports = router;
