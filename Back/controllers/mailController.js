// controllers/mailController.js
const mailService = require("../services/mailService");
const userService = require("../services/userService");

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

  // Verificar si el destinatario existe
  const users = userService.readUsers();
  const receiverExists = users.some(user => user.email === receiver);

  if (!receiverExists) {
    return res.status(404).json({ 
      error: "El destinatario no existe en el sistema.",
      code: "RECEIVER_NOT_FOUND"
    });
  }

  const newMail = mailService.sendMail({ sender, receiver, subject, content });
  res.status(201).json({ message: "Mail sent successfully", mail: newMail });
};
