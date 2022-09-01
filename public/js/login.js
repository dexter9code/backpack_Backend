// import axios from "axios";

const login = async function (email, password) {
  try {
    const res = await axios({
      method: "POST",
      url: `http://localhost:8080/backpack/api/r1/user/login`,
      data: {
        email,
        password,
      },
    });
    if (res.data.status === "Success") {
      alert(`Logged in Successfully`);
      window.setTimeout(() => {
        location.assign(`/overview`);
      }, 800);
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});
