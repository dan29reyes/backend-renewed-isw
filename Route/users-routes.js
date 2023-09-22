const express = require("express");
const router = express.Router();

const userController = require("../Controller/users-controller");

router.get("/list", userController.getUserList);

module.exports = router;
