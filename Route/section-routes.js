const express = require("express");
const router = express.Router();

const sections = require("../Controller/section-controller");

router.get("/", sections.getSections);
router.get("/search", sections.InfoSection);

/*router.put("/update", admins.updateUser);
router.delete("/delete", admins.deleteAdmin);
router.post("/register", admins.registerAdmin);
router.post("/login", admins.loginUser);*/

router.post("/create", sections.sectionCreate);
module.exports = router;
