// inbox.js
import { getUser, logout, redirectIfNotLogged } from "./session.js";

redirectIfNotLogged();

const user = getUser();
document.getElementById("welcomeMessage").textContent =
  `Bienvenido, ${user.username}!`;
document.getElementById("logoutBtn").addEventListener("click", logout);
