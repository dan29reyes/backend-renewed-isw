const express = require("express");
const router = express.Router();

const userController = require("../Controller/users-controller");

//Post
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/updateName", userController.updateUserName);
router.post("/updateEmail", userController.updateUserEmail);
router.post("/updatePhone", userController.updateUserPhone);
router.post("/updatePassword", userController.updateUserPassword);
router.post("/changeActive", userController.updateUserActive);
router.post("/assignRole", userController.assignRole);

//Get
router.get("/viewUsers", userController.getAllusers);

//Delete
router.delete("/removeRole", userController.removeRole);

module.exports = router;
