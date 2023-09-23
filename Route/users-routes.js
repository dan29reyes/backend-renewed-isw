const express = require("express");
const router = express.Router();

const userController = require("../Controller/users-controller");

router.get("/list", userController.getUserList)
router.get("/", userController.getUser)
router.post("/register", userController.registerUser)
router.put("/update", userController.updateUserAdmin)
router.put("/updatePassword", userController.updateUserPassword)
router.put("/updateEmail", userController.updateUserEmail)
router.delete("/delete", userController.deleteUser)

module.exports = router;
