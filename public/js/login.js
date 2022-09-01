// import axios from "axios";

const login = async function (email, password) {
  try {
    console.log(email, password);
    const res = await axios({
      method: "POST",
      url: `http://localhost:8080/backpack/api/r1/user/login`,
      data: {
        email,
        password,
      },
    });
    console.log(res);
  } catch (error) {
    console.log(error.response.data);
  }
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});
