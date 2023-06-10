import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://34.22.79.51:5000/api/",
});

// axiosInstance.interceptors.request.use((config) => {
//   // 헤더에 추가할 필요한 내용 설정
//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: 'Bearer your_token_here',
//   };

//   // 요청 헤더에 헤더 추가
//   config.headers = headers;

//   return config;
// });
