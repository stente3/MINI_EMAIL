// services/mailService.js
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const mailPath = path.join(__dirname, "../data/mails.json");

function loadMails() {
  if (!fs.existsSync(mailPath)) return [];
  const data = fs.readFileSync(mailPath, "utf-8");
  return JSON.parse(data);
}

function saveMails(mails) {
  fs.writeFileSync(mailPath, JSON.stringify(mails, null, 2));
}

function getInbox(email) {
  const mails = loadMails();
  return mails.filter((mail) => mail.receiver === email);
}

function getSent(email) {
  const mails = loadMails();
  return mails.filter((mail) => mail.sender === email);
}

function sendMail({ sender, receiver, subject, content }) {
  const mails = loadMails();
  const newMail = {
    id: uuidv4(),
    sender,
    receiver,
    subject,
    content,
    timestamp: new Date().toISOString(),
  };
  mails.push(newMail);
  saveMails(mails);
  return newMail;
}

module.exports = {
  getInbox,
  getSent,
  sendMail,
};
