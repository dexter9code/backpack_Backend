import { showAlert } from "./alerts";

export const login = async function (email, password) {
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
      showAlert("success", "Logged in Successfully");
      window.setTimeout(() => {
        location.assign(`/overview`);
      }, 2000);
    }
  } catch (error) {
    showAlert("error", error.response?.data.message);
  }
};
