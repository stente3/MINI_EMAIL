export function getUser() {
  return JSON.parse(localStorage.getItem("loggedUser"));
}

export function logout() {
  localStorage.removeItem("loggedUser");
  window.location.href = "/";
}

export function redirectIfNotLogged() {
  if (!getUser()) {
    window.location.href = "/";
  }
}
