import { showAlert } from "./alerts";

export const AddProduct = async function (data) {
  try {
    const res = await axios({
      method: "POST",
      url: `http://localhost:8080/backpack/api/r1/tours/addTour`,
      data,
    });

    if (res.data.status === "Success") {
      showAlert("success", "Added to the Database");
    }
  } catch (error) {
    console.log(error);
    console.log(error.message);
    showAlert("error", error.response?.data.message);
  }
};
