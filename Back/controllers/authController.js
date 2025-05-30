const userService = require("../services/userService");

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos." });
  }

  const users = userService.readUsers();
  const exists = users.find(
    (u) => u.username === username || u.email === email,
  );

  if (exists) {
    return res.status(409).json({ message: "El usuario ya existe." });
  }

  const newUser = { username, email, password };
  users.push(newUser);
  userService.writeUsers(users);

  res.status(201).json({ message: "Usuario registrado exitosamente." });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos." });
  }

  const users = userService.readUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas." });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.status(200).json({ message: "Inicio de sesión exitoso.", user: userWithoutPassword });
};
