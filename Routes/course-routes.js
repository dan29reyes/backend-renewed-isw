const express = require("express");
const router = express();

const courseControllers = require("../Controller/course-controllers");

//Post
router.post("/create", courseControllers.createCourse);
router.post("/updateName", courseControllers.updateCourseName);
router.post("/updateDescription", courseControllers.updateCourseDescription);

//Delete
router.delete("/delete", courseControllers.deleteCourse);

//Get
router.get("/getCourses", courseControllers.getCourses);

module.exports = router;
