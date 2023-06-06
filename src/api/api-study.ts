import axios from "axios";

export const getStudyData = async () => {
  try {
    const response = await axios.get("http://34.22.79.51:3000/api/study/info", {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
