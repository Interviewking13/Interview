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

export function fetchStudyData() {
  return axios
    .get("http://34.22.79.51:5000/api/study/info")
    .then((response) => response.data);
}

export function fetchStudyDatas() {
  return axios
    .get("http://34.22.79.51:5000/api/study/info/6480f55eaec49c9eef6ea6ef")
    .then((response) => response.data);
}
