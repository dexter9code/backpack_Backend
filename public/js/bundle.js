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


//Dom Elements
const $d0f7ce18c37ad6f6$var$loginForm = document.querySelector(".form");
const $d0f7ce18c37ad6f6$var$logoutBtn = document.getElementById("logoutBTN");
if ($d0f7ce18c37ad6f6$var$loginForm) $d0f7ce18c37ad6f6$var$loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    (0, $70af9284e599e604$export$596d806903d1f59e)(email, password);
});
if ($d0f7ce18c37ad6f6$var$logoutBtn) $d0f7ce18c37ad6f6$var$logoutBtn.addEventListener("click", (0, $70af9284e599e604$export$cad1a703886b4e3a));


//# sourceMappingURL=bundle.js.map
