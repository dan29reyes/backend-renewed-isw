const emailsService = require("../Service/mail-services");
const nodemailer = require("nodemailer");
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

async function sendEmailMultiple(req, res) {
  const { name, email, subject, message, recipients } = req.body;

  try {
    const results = await emailsService.sendEmailMultiple(
      name,
      email,
      subject,
      message,
      recipients
    );
    res.send("Correos enviados con éxito: " + results.join(", "));
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al enviar los correos");
  }
}

module.exports = {
  sendEmail,
  sendEmailMultiple,
};
