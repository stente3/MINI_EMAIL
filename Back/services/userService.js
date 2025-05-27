const fs = require("fs");
const path = require("path");

const USERS_FILE = path.join(__dirname, "..", "data", "users.json");

exports.readUsers = () => {
  if (!fs.existsSync(USERS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(USERS_FILE, "utf-8");
  return JSON.parse(data || "[]");
};

exports.writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};
