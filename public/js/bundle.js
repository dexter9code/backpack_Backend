const $3adf927435cf4518$var$hideAlert = ()=>{
    const el = document.querySelector(".alert");
    if (el) el.parentElement.removeChild(el);
};
const $3adf927435cf4518$export$de026b00723010c1 = (type, msg)=>{
    $3adf927435cf4518$var$hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
    window.setTimeout($3adf927435cf4518$var$hideAlert, 2000);
};


const $70af9284e599e604$export$596d806903d1f59e = async function(email, password) {
    try {
        const res = await axios({
            method: "POST",
            url: `http://localhost:8080/backpack/api/r1/user/login`,
            data: {
                email: email,
                password: password
            }
        });
        if (res.data.status === "Success") {
            (0, $3adf927435cf4518$export$de026b00723010c1)("success", "Logged in Successfully");
            window.setTimeout(()=>{
                location.assign(`/overview`);
            }, 2000);
        }
    } catch (error) {
        (0, $3adf927435cf4518$export$de026b00723010c1)("error", error.response?.data.message);
    }
};
const $70af9284e599e604$export$cad1a703886b4e3a = async function() {
    try {
        const res = await axios({
            method: "GET",
            url: `http://localhost:8080/backpack/api/r1/user/logout`
        });
        if (res.data.status === "Success") location.reload(true);
    } catch (error) {
        (0, $3adf927435cf4518$export$de026b00723010c1)("error", "Error while logging out!");
    }
};



const $724f469c4d3d7721$export$3bf0495508a61ee = async function(data) {
    try {
        const res = await axios({
            method: "PATCH",
            url: `http://localhost:8080/backpack/api/r1/user/updateMe`,
            data: data
        });
        if (res.data.status === "Success") (0, $3adf927435cf4518$export$de026b00723010c1)("success", "update successfully");
    } catch (error) {
        (0, $3adf927435cf4518$export$de026b00723010c1)("error", error.response.data.message);
    }
};
const $724f469c4d3d7721$export$e2853351e15b7895 = async function(currentPassword, password, confirmPassword) {
    try {
        const res = await axios({
            method: "PATCH",
            url: `http://localhost:8080/backpack/api/r1/user/updatePassword`,
            data: {
                currentPassword: currentPassword,
                password: password,
                confirmPassword: confirmPassword
            }
        });
        if (res.data.status === "Success") {
            (0, $3adf927435cf4518$export$de026b00723010c1)("success", "Password changed successfully");
            window.setTimeout(()=>{
                location.reload(true);
            }, 1500);
        }
    } catch (error) {
        (0, $3adf927435cf4518$export$de026b00723010c1)("error", error.response.data.message);
    }
};


//Dom Elements
const $d0f7ce18c37ad6f6$var$loginForm = document.querySelector(".form--login");
const $d0f7ce18c37ad6f6$var$logoutBtn = document.getElementById("logoutBTN");
const $d0f7ce18c37ad6f6$var$form = document.querySelector(".form-user-data");
const $d0f7ce18c37ad6f6$var$passwordForm = document.querySelector(".form-user-settings");
if ($d0f7ce18c37ad6f6$var$loginForm) $d0f7ce18c37ad6f6$var$loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    (0, $70af9284e599e604$export$596d806903d1f59e)(email, password);
});
if ($d0f7ce18c37ad6f6$var$logoutBtn) $d0f7ce18c37ad6f6$var$logoutBtn.addEventListener("click", (0, $70af9284e599e604$export$cad1a703886b4e3a));
if ($d0f7ce18c37ad6f6$var$form) $d0f7ce18c37ad6f6$var$form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);
    console.log(form);
    (0, $724f469c4d3d7721$export$3bf0495508a61ee)(form);
});
if ($d0f7ce18c37ad6f6$var$passwordForm) $d0f7ce18c37ad6f6$var$passwordForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const currentPassword = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("password-confirm").value;
    await (0, $724f469c4d3d7721$export$e2853351e15b7895)(currentPassword, password, confirmPassword);
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
}); // "currentPassword":"testuser2",
 //   "password":"newtestuser2",
 //   "confirmPassword":"newtestuser2"


//# sourceMappingURL=bundle.js.map
