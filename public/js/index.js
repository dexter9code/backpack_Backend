// import "@babel/polyfill";
import { login, Logout } from "./login";
import { updateData, updatePassword } from "./updatingSetting";
import { AddProduct } from "./addProuct";

//Dom Elements
const loginForm = document.querySelector(".form--login");
const logoutBtn = document.getElementById("logoutBTN");
const form = document.querySelector(".form-user-data");
const passwordForm = document.querySelector(".form-user-settings");
const productForm = document.querySelector(".form--product");

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
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);
    console.log(form);

    updateData(form);
  });

if (productForm)
  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", document.getElementById("title").value);
    form.append("price", document.getElementById("price").value);
    form.append("duration", document.getElementById("duration").value);
    form.append("guides", document.getElementById("guide").value);
    form.append("tourImage", document.getElementById("tourImage").files[0]);
    form.append("summary", document.getElementById("summary").value);
    form.append("description", document.getElementById("description").value);
    console.log(form);
    await AddProduct(form);
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
