import axios from "axios";

export function fetchData() {
  return (
    axios
      .get("http://34.22.79.51:5000/api/community/detl?community_no=1")
      // .get("http://34.22.79.51:5000/api/community/list")
      .then((response) => response.data)
  );
}
export function postData() {
  return axios
    .post("http://34.22.79.51:5000/api/community/detl", {
      title: "게시글 제목 이용섭테스트",
      content: "게시글 내용 이용섭테스트",
      attach: "",
    })
    .then((response) => {
      // 응답 데이터를 JSON 파일로 파싱하여 반환
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

// export function postData() {
//   return axios
//     .post("http://34.22.79.51:5000/api/community/detl",
//     {
//       title: "게시글 제목 이용섭테스트",
//       content: "게시글 내용 이용섭테스트",
//       attach: "",
//     }
//     )
//     .then((response) => {
//       console.log(response.data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }
