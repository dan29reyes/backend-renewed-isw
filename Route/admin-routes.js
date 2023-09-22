const express = require("express");
const router = express.Router();

const admins = require("../Controller/admin-controller");

//GETS
router.get("/", admins.getAdmins);
router.get("/teachers",admins.getTeachers);
router.get("/students",admins.getStudents);

//UPDATE
router.put("/update", admins.updateUser);

//DELETE
router.delete("/delete", admins.deleteAdmin);

//POST
router.post("/register", admins.registerAdmin);
router.post("/login", admins.loginUser);

module.exports = router;