const {
  getSections: get,
  GetInfoSection: infoSection,
  GetInfoSectionMon: infoSectionMon,
  CreateSection: createSection,
  DeleteSection: deleteSection,
  SectionExists: sectionExi,
  updateSectionCourseId: updateCourse,
  updateQuarterSection: updateQuarter,
  updateTeacherSection: updateTeacher,
  updateYearSection: updateYear,
} = require("../Service/section-services");

const { ExisteTeacher: existTeacher } = require("../Service/admin-services");

const {
  ExistSectionAnnounce: existAnnounceForSection,
  DeleteAnnounce: deleteAnnounce,
  DeleteAnnounce_d: deleteAnnounce_d,
} = require("../Service/announce-services");

async function getSections(_, res) {
  const sections = await get();
  res.send(sections);
}

async function InfoSection(req, res) {
  const { course_id } = req.query;
  const section = await infoSection(course_id);
  res.send(section);
}

async function InfoSeccMod(req, res) {
  try {
    const section = await infoSectionMon();
   
    res.send(section);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
  
}


async function sectionCreate(req, res) {
  const section = req.body;
  const result = await createSection(section);
  res.send(result);
}

async function EraseSection(req, res) {
  try {
    const errorMessage = [];

    const { id } = req.query;
    const exists = await sectionExi(id);

    const existAnnounce = await existAnnounceForSection(exists[0].id);

    if (!id) {
      errorMessage.push("PARAMETER ID REQUIRED!!");
    }
    if (!exists) {
      errorMessage.push("ID NOT EXISTS!!");
    }

    if (errorMessage.length > 0) {
      res.status(404).send(errorMessage);
    } else {
      if (existAnnounce) {
        for (i = 0; i < existAnnounce.length; i++) {
          await deleteAnnounce_d(existAnnounce[i].announce_id);
          await deleteAnnounce(existAnnounce[i].announce_id);
        }
      }
      await deleteSection(id);
      res.status(200).send();
    }
  } catch (e) {
    console.error("Error:", e);
    res.status(500).send("INTERNAL SERVER ERROR!!");
  }
}

async function UpdateSectionCourseId(req, res) {
  try {
    const errorMessage = [];

    const { id } = req.query;
    const course = req.body;
    const exists = await sectionExi(id);

    if (!id) {
      errorMessage.push("PARAMETER ID REQUIRED!!");
    }
    if (!exists) {
      errorMessage.push("ID NOT EXISTS!!");
    }

    if (errorMessage.length > 0) {
      res.status(404).send(errorMessage);
    } else {
      await updateCourse(id, course.course_id);
      res.status(200).send();
    }
  } catch (e) {
    res.status(500).send("INTERNAL SERVER ERROR!!");
  }
}

async function UpdateSectionCourseId(req, res) {
  try {
    const errorMessage = [];

    const { id } = req.query;
    const course = req.body;
    const exists = await sectionExi(id);

    if (!id) {
      errorMessage.push("PARAMETER ID REQUIRED!!");
    }
    if (!exists) {
      errorMessage.push("ID NOT EXISTS!!");
    }

    if (errorMessage.length > 0) {
      res.status(404).send(errorMessage);
    } else {
      await updateCourse(id, course.course_id);
      res.status(200).send();
    }
  } catch (e) {
    res.status(500).send("INTERNAL SERVER ERROR!!");
  }
}

async function UpdateSectionTeacher(req, res) {
  try {
    const errorMessage = [];

    const { id } = req.query;
    const teacher = req.body;
    const exists = await existTeacher(teacher.teacher_id);
    const existsId = await sectionExi(id);

    if (!id) {
      errorMessage.push("PARAMETER ID SECTION REQUIRED!!");
    }
    if (!exists) {
      errorMessage.push("ID TEACHER NOT EXISTS!!");
    }
    if (!existsId) {
      errorMessage.push("ID SECTION NOT EXISTS!!");
    }

    if (errorMessage.length > 0) {
      res.status(404).send(errorMessage);
    } else {
      await updateTeacher(id, teacher.teacher_id);
      res.status(200).send();
    }
  } catch (e) {
    res.status(500).send("INTERNAL SERVER ERROR!!");
  }
}

async function UpdateSectionYear(req, res) {
  try {
    const errorMessage = [];

    const { id } = req.query;
    const change = req.body;
    const existsId = await sectionExi(id);

    if (!id) {
      errorMessage.push("PARAMETER ID SECTION REQUIRED!!");
    }
    if (!existsId) {
      errorMessage.push("ID SECTION NOT EXISTS!!");
    }

    if (errorMessage.length > 0) {
      res.status(404).send(errorMessage);
    } else {
      await updateYear(id, change.year);
      res.status(200).send();
    }
  } catch (e) {
    res.status(500).send("INTERNAL SERVER ERROR!!");
  }
}

async function UpdateSectionQuarter(req, res) {
  try {
    const errorMessage = [];

    const { id } = req.query;
    const change = req.body;
    const existsId = await sectionExi(id);

    if (!id) {
      errorMessage.push("PARAMETER ID SECTION REQUIRED!!");
    }
    if (!existsId) {
      errorMessage.push("ID SECTION NOT EXISTS!!");
    }

    if (errorMessage.length > 0) {
      res.status(404).send(errorMessage);
    } else {
      await updateQuarter(id, change.quarter);
      res.status(200).send();
    }
  } catch (e) {
    res.status(500).send("INTERNAL SERVER ERROR!!");
  }
}

module.exports = {
  getSections,
  InfoSection,
  sectionCreate,
  EraseSection,
  UpdateSectionCourseId,
  UpdateSectionTeacher,
  UpdateSectionYear,
  UpdateSectionQuarter,
  InfoSeccMod,
};
