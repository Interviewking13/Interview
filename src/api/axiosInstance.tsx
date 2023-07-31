import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token") || ""; // 토큰이 있을 경우 토큰값 반환
};

export const axiosInstance = axios.create({
  baseURL:
    "https://port-0-interviewking13-7xwyjq992llj5sps0m.sel4.cloudtype.app/api/",
});
