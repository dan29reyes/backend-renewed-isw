const express = require("express");
const router = express.Router();

const sections = require("../Controller/section-controller");

//gets
router.get("/", sections.getSections);
router.get("/search", sections.InfoSection);
router.get("/search2", sections.InfoSeccMod);

//updates
router.put("/update/courseId", sections.UpdateSectionCourseId);
router.put("/update/teacher", sections.UpdateSectionTeacher);
router.put("/update/year", sections.UpdateSectionYear);
router.put("/update/quarter", sections.UpdateSectionQuarter);

//create
router.post("/create", sections.sectionCreate);

//delete
router.delete("/delete", sections.EraseSection);
module.exports = router;
