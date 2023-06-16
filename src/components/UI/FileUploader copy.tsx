// import { useQuery } from "react-query";
// import { getUserData, putUserData } from "../../api/api-user";
// import AWS from "aws-sdk";

// //1. s3 스토리지 플러그인가져오기
// AWS.config.update({
//   //스토리지인증키작성
//   accessKeyId: "AKIA4WQLMJXFZI2K7J2F",
//   secretAccessKey: "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",
//   region: "ap-northeast-2",
// });
// const onClickfileDownload = () => {
//   // 2.다운로드클릭이벤트 작성
//   // 3. token호출 후 useQuery로 파일네임, 파일 키 가져오기
//   // const token =
//   //   localStorage.getItem("token"); /**회원정보조회를 위한 토큰 가져오기*/
//   // const {
//   //   data: userData,
//   //   isLoading,
//   //   isError,
//   // } = useQuery(["userData"], () => getUserData(token as string)); //useQuery로 getdata
//   // if (isLoading) {
//   //   // 로딩 상태를 표시
//   //   return <div>Loading...</div>;
//   // }
//   // if (isError) {
//   //   // 에러 상태를 표시
//   //   return <div>Error occurred while fetching token</div>;
//   // }
//   // console.log("UserData", userData);
//   // const { file_name, file_key } = userData?.data || {}; //file_name, file_key 데이터 이름 미정

//   const s3 = new AWS.S3();
//   const bucketName = "13team";

//   const params = {
//     Bucket: bucketName,
//     Key: { file_key },
//   };

//   s3.getSignedUrl("getObject", params, (err, url) => {
//     if (err) {
//       console.error("Error generating download URL:", err);
//       return;
//     }
//     console.log("Download URL:", url);
//     // 생성된 다운로드 URL을 사용하거나, 이를 표시할 다이얼로그 또는 링크로 전달하여 사용자에게 제공합니다.
//     window.open(url, "_blank");
//   });

//   return (
//     <button>
//       {" "}
//       onClick={onClickfileDownload}
//       {file_name}
//     </button>
//   );
// };
