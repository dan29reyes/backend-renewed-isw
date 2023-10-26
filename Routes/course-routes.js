const express = require("express");
const router = express.Router();

const courseControllers = require("../Controller/course-controller");

router.post("/create", courseControllers.createCourse);
router.post("/assignTeacher", courseControllers.assignTeacher);
router.post("/setActive", courseControllers.setActiveCourse);

router.get("/viewTeacherCourses", courseControllers.getTeacherCourse);
router.get("/viewAll", courseControllers.getAllCourse);

module.exports = router;
