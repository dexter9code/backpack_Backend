// import "@babel/polyfill";
import { login, Logout } from "./login";

//Dom Elements
const loginForm = document.querySelector(".form");
const logoutBtn = document.getElementById("logoutBTN");

if (loginForm)
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });

if (logoutBtn) logoutBtn.addEventListener("click", Logout);
