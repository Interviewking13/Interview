import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token") || ""; // 토큰이 있을 경우 토큰값 반환
};

export const axiosInstance = axios.create({
  baseURL: "https://port-0-interview-3prof2lll0yg90q.sel3.cloudtype.app/api/",
});
