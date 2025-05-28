// controllers/mailController.js
const mailService = require("../services/mailService");

exports.getInbox = (req, res) => {
  const { email } = req.params;
  const inbox = mailService.getInbox(email);
  res.json(inbox);
};

exports.getSent = (req, res) => {
  const { email } = req.params;
  const sent = mailService.getSent(email);
  res.json(sent);
};

exports.sendMail = (req, res) => {
  const { sender, receiver, subject, content } = req.body;

  if (!sender || !receiver || !subject || !content) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const newMail = mailService.sendMail({ sender, receiver, subject, content });
  res.status(201).json({ message: "Mail sent successfully", mail: newMail });
};
