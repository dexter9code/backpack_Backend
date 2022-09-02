// import "@babel/polyfill";
import { login, Logout } from "./login";
import { updateData, updatePassword } from "./updatingSetting";

//Dom Elements
const loginForm = document.querySelector(".form--login");
const logoutBtn = document.getElementById("logoutBTN");
const form = document.querySelector(".form-user-data");
const passwordForm = document.querySelector(".form-user-settings");

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

if (passwordForm)
  passwordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("password-confirm").value;

    await updatePassword(currentPassword, password, confirmPassword);

    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
  });

// "currentPassword":"testuser2",
//   "password":"newtestuser2",
//   "confirmPassword":"newtestuser2"
