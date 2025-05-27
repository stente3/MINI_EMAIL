const userService = require("../services/userService");

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const users = userService.readUsers();
  const exists = users.find(
    (u) => u.username === username || u.email === email,
  );

  if (exists) {
    return res.status(409).json({ message: "User already exists." });
  }

  const newUser = { username, email, password };
  users.push(newUser);
  userService.writeUsers(users);

  res.status(201).json({ message: "User registered successfully." });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const users = userService.readUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  res.status(200).json({ message: "Login successful.", user });
};
