const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, "data", "users.json");

app.use(cors());
app.use(express.json());

// Función para leer usuarios
function readUsers() {
  if (!fs.existsSync(USERS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(USERS_FILE, "utf-8");
  return JSON.parse(data || "[]");
}

// Función para guardar usuarios
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Endpoint: Registrar nuevo usuario
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const users = readUsers();

  const exists = users.find(
    (u) => u.username === username || u.email === email,
  );
  if (exists) {
    return res.status(409).json({ message: "User already exists." });
  }

  const newUser = { username, email, password };
  users.push(newUser);
  writeUsers(users);

  res.status(201).json({ message: "User registered successfully." });
});

// Endpoint: Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const users = readUsers();

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  res.status(200).json({ message: "Login successful.", user });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
