// routes/mailRoutes.js
const express = require("express");
const router = express.Router();
const mailController = require("../controllers/mailController");

// 📥 Correos recibidos
router.get("/inbox/:email", mailController.getInbox);

// 📤 Correos enviados
router.get("/sent/:email", mailController.getSent);

// 📨 Enviar correo
router.post("/send", mailController.sendMail);

module.exports = router;
