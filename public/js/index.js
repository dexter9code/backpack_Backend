// import "@babel/polyfill";
import { login, Logout } from "./login";
import { updateData } from "./updatingSetting";

//Dom Elements
const loginForm = document.querySelector(".form--login");
const logoutBtn = document.getElementById("logoutBTN");
const form = document.querySelector(".form-user-data");

if (loginForm)
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });

if (logoutBtn) logoutBtn.addEventListener("click", Logout);

if (form)
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    updateData(name, email);
  });
