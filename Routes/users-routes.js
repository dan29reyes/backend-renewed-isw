const express = require("express");
const router = express.Router();

const userController = require("../Controller/users-controller");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/updateName", userController.updateUserName);
router.post("/updateEmail", userController.updateUserEmail);
router.post("/updatePhone", userController.updateUserPhone);
router.post("/updatePassword", userController.updateUserPassword);
router.post("/changeActive", userController.updateUserActive);
router.post("/assignRole", userController.assignRole);
router.post("/removeRole", userController.removeRole);

router.get("/viewUsers", userController.getAllusers);

module.exports = router;
