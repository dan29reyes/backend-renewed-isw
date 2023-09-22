const sectionServices= require("../Service/section-services");

async function getSections(_, res) {
  const sections = await sectionServices.getSections();
  res.send(sections);
}

async function InfoSection(req, res) {
  const { course_id } = req.query;
  const section = await sectionServices.GetInfoSection(course_id);
  res.send(section);
}

async function sectionCreate(req, res) {
  const section = req.body;
  const result = await sectionServices.CreateSection(section);
  res.send(result);
}

module.exports = {
  getSections,
  InfoSection,
  sectionCreate,
};
