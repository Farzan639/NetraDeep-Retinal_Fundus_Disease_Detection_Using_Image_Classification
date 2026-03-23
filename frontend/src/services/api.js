import axios from "axios";

const API_URL = "https://bbae-2409-40d2-11-574e-3541-a652-2649-c454.ngrok-free.app/predict";
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
