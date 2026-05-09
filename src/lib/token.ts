export function setToken(token: string) {
  localStorage.setItem("token", token);
  window.dispatchEvent(new Event("authChanged"));
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event("authChanged"));
}