// inbox.js
import { getUser, logout, redirectIfNotLogged } from "./session.js";

redirectIfNotLogged();

const user = getUser();
const API_URL = 'http://localhost:3000';

// Elementos del DOM
const welcomeMessage = document.getElementById("welcomeMessage");
const logoutBtn = document.getElementById("logoutBtn");
const inboxBtn = document.getElementById("inboxBtn");
const sentBtn = document.getElementById("sentBtn");
const newMailBtn = document.getElementById("newMailBtn");
const mailList = document.getElementById("mailList");
const sentMails = document.getElementById("sentMails");
const newMailForm = document.getElementById("newMailForm");
const sendMailForm = document.getElementById("sendMailForm");
const inboxMails = document.getElementById("inboxMails");
const sentMailsList = document.getElementById("sentMailsList");
const refreshBtn = document.getElementById("refreshBtn");
let lastMailsCount = 0;
let autoRefreshInterval;

// Configuración inicial
welcomeMessage.textContent = `Bienvenido, ${user.username}!`;
logoutBtn.addEventListener("click", logout);
refreshBtn.addEventListener("click", handleManualRefresh);

// Navegación
inboxBtn.addEventListener("click", () => {
  showSection(mailList);
  loadInbox();
});

sentBtn.addEventListener("click", () => {
  showSection(sentMails);
  loadSentMails();
});

newMailBtn.addEventListener("click", () => {
  showSection(newMailForm);
});

// Funciones de navegación
function showSection(section) {
  [mailList, sentMails, newMailForm].forEach(s => s.classList.remove('active'));
  [inboxBtn, sentBtn, newMailBtn].forEach(btn => btn.classList.remove('active'));
  section.classList.add('active');
  
  if (section === mailList) {
    inboxBtn.classList.add('active');
    startAutoRefresh();
  } else {
    stopAutoRefresh();
  }
  
  if (section === sentMails) sentBtn.classList.add('active');
  if (section === newMailForm) newMailBtn.classList.add('active');
}

// Función para manejar la actualización manual
async function handleManualRefresh() {
  refreshBtn.classList.add('rotating');
  await loadInbox();
  refreshBtn.classList.remove('rotating');
}

// Función para verificar nuevos correos
async function checkNewMails() {
  try {
    const response = await fetch(`${API_URL}/mails/inbox/${user.email}`);
    const mails = await response.json();
    
    if (mails.length > lastMailsCount) {
      loadInbox();
    }
    lastMailsCount = mails.length;
  } catch (error) {
    console.error('Error al verificar nuevos correos:', error);
  }
}

// Cargar correos recibidos
async function loadInbox() {
  try {
    const response = await fetch(`${API_URL}/mails/inbox/${user.email}`);
    const mails = await response.json();
    lastMailsCount = mails.length;
    displayMails(inboxMails, mails);
  } catch (error) {
    console.error('Error al cargar la bandeja de entrada:', error);
  }
}

// Cargar correos enviados
async function loadSentMails() {
  try {
    const response = await fetch(`${API_URL}/mails/sent/${user.email}`);
    const mails = await response.json();
    displayMails(sentMailsList, mails);
  } catch (error) {
    console.error('Error al cargar los correos enviados:', error);
  }
}

// Mostrar correos en el DOM
function displayMails(container, mails) {
  container.innerHTML = '';
  mails.forEach(mail => {
    const mailElement = document.createElement('div');
    mailElement.className = 'mail-item';
    mailElement.innerHTML = `
      <h3>${mail.subject}</h3>
      <p>De: ${mail.sender}</p>
      <p>Para: ${mail.receiver}</p>
      <p>${mail.content}</p>
    `;
    container.appendChild(mailElement);
  });
}

// Enviar nuevo correo
sendMailForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const mailData = {
    sender: user.email,
    receiver: document.getElementById('receiver').value,
    subject: document.getElementById('subject').value,
    content: document.getElementById('content').value
  };

  try {
    const response = await fetch(`${API_URL}/mails/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mailData)
    });

    if (response.ok) {
      sendMailForm.reset();
      showSection(mailList);
    } else {
      alert('Error al enviar el correo');
    }
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    alert('Error al enviar el correo');
  }
});

// Iniciar verificación automática
function startAutoRefresh() {
  // Verificar cada 30 segundos
  autoRefreshInterval = setInterval(checkNewMails, 30000);
}

// Detener verificación automática
function stopAutoRefresh() {
  clearInterval(autoRefreshInterval);
}

// Iniciar la verificación automática al cargar la página
loadInbox();
startAutoRefresh();
