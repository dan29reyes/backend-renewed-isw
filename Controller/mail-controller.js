const emailsService = require("../Service/mail-services");

//POST
async function sendEmail(req, res) {
  const { to, subject, html, attachments } = req.body;

  try {
    const info = await emailsService.sendEmail(to, subject, html, attachments);
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
}

module.exports = {
  sendEmail,
};
