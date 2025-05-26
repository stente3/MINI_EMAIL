const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const resultDiv = document.getElementById("result");

const API_URL = "http://localhost:3000";

// Si ya hay usuario logueado, redirigir automáticamente
const existingUser = localStorage.getItem("loggedUser");
if (existingUser) {
  window.location.href = "inbox.html";
}

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("regUsername").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  try {
    //TODO: ¿Cómo funciona una función asincrona en javascript?
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      resultDiv.textContent = data.message;
      resultDiv.className = "message";
      registerForm.reset();
    } else {
      resultDiv.textContent = data.message;
      resultDiv.className = "error";
    }
  } catch (error) {
    resultDiv.textContent = "Error connecting to server.";
    resultDiv.className = "error";
  }
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      // Guardar usuario en localStorage
      localStorage.setItem("loggedUser", JSON.stringify(data.user));

      // Redirigir a inbox.html
      window.location.href = "inbox.html";
    } else {
      resultDiv.textContent = data.message;
      resultDiv.className = "error";
    }
  } catch (error) {
    resultDiv.textContent = "Error connecting to server.";
    resultDiv.className = "error";
  }
});
