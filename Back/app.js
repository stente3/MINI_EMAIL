const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const mailRoutes = require("./routes/mailRoutes.js");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas
app.use("/auth", authRoutes);
app.use("/mails", mailRoutes);

module.exports = app;
