const $1eb0cc260df27e1b$var$hideAlert = ()=>{
    const el = document.querySelector(".alert");
    if (el) el.parentElement.removeChild(el);
};
const $1eb0cc260df27e1b$export$de026b00723010c1 = (type, msg)=>{
    $1eb0cc260df27e1b$var$hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
    window.setTimeout($1eb0cc260df27e1b$var$hideAlert, 2000);
};


const $e33d9ff231aec008$export$596d806903d1f59e = async function(email, password) {
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
            (0, $1eb0cc260df27e1b$export$de026b00723010c1)("success", "Logged in Successfully");
            window.setTimeout(()=>{
                location.assign(`/overview`);
            }, 2000);
        }
    } catch (error) {
        (0, $1eb0cc260df27e1b$export$de026b00723010c1)("error", error.response?.data.message);
    }
};
const $e33d9ff231aec008$export$cad1a703886b4e3a = async function() {
    try {
        const res = await axios({
            method: "GET",
            url: `http://localhost:8080/backpack/api/r1/user/logout`
        });
        if (res.data.status === "Success") location.reload(true);
    } catch (error) {
        (0, $1eb0cc260df27e1b$export$de026b00723010c1)("error", "Error while logging out!");
    }
};



const $bfe971cba9d06cf8$export$3bf0495508a61ee = async function(name, email) {
    try {
        const res = await axios({
            method: "PATCH",
            url: `http://localhost:8080/backpack/api/r1/user/updateMe`,
            data: {
                email: email,
                name: name
            }
        });
        if (res.data.status === "Success") {
            (0, $1eb0cc260df27e1b$export$de026b00723010c1)("success", "update successfully");
            window.setTimeout(()=>{
                location.reload(true);
            }, 1500);
        }
    } catch (error) {
        (0, $1eb0cc260df27e1b$export$de026b00723010c1)("error", error.response.data.message);
    }
};


//Dom Elements
const $1cd085a7ac742057$var$loginForm = document.querySelector(".form--login");
const $1cd085a7ac742057$var$logoutBtn = document.getElementById("logoutBTN");
const $1cd085a7ac742057$var$form = document.querySelector(".form-user-data");
if ($1cd085a7ac742057$var$loginForm) $1cd085a7ac742057$var$loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    (0, $e33d9ff231aec008$export$596d806903d1f59e)(email, password);
});
if ($1cd085a7ac742057$var$logoutBtn) $1cd085a7ac742057$var$logoutBtn.addEventListener("click", (0, $e33d9ff231aec008$export$cad1a703886b4e3a));
if ($1cd085a7ac742057$var$form) $1cd085a7ac742057$var$form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    (0, $bfe971cba9d06cf8$export$3bf0495508a61ee)(name, email);
});


//# sourceMappingURL=module.js.map
