import axios from "axios";

const API_URL = "https://netradeep-retinal-fundus-disease.onrender.com/predict";
// ⚠ Replace this with your real Render backend URL

export const predictImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};