const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const mailRoutes = require("./routes/mailRoutes.js");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use("/auth", authRoutes);
app.use("/mails", mailRoutes);

module.exports = app;
