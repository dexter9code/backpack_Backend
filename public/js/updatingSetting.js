import { showAlert } from "./alerts";

export const updateData = async function (name, email) {
  try {
    const res = await axios({
      method: "PATCH",
      url: `http://localhost:8080/backpack/api/r1/user/updateMe`,
      data: {
        email,
        name,
      },
    });

    if (res.data.status === "Success") {
      showAlert("success", "update successfully");
      window.setTimeout(() => {
        location.reload(true);
      }, 1500);
    }
  } catch (error) {
    showAlert("error", error.response.data.message);
  }
};

export const updatePassword = async function (
  currentPassword,
  password,
  confirmPassword
) {
  try {
    const res = await axios({
      method: "PATCH",
      url: `http://localhost:8080/backpack/api/r1/user/updatePassword`,
      data: {
        currentPassword,
        password,
        confirmPassword,
      },
    });

    if (res.data.status === "Success") {
      showAlert("success", "Password changed successfully");
      window.setTimeout(() => {
        location.reload(true);
      }, 1500);
    }
  } catch (error) {
    showAlert("error", error.response.data.message);
  }
};
