const express = require("express");
const router = express.Router();

const emailsController = require("../Controller/mail-controller");

//POST
router.post("/send", emailsController.sendEmail);

module.exports = router;
