import { useQuery } from "@tanstack/react-query";
import { getInfoStudyData1 } from "../api/api-study";

export const studyServiceKeys = {
  useGetStudyInfo: ["getInfoStudyData"],
};

// export const useGetStudyInfo = (study_id: string) => {
//   return useQuery<any>(
//     studyServiceKeys.useGetStudyInfo(study_id),
//     getInfoStudyData1,
//     {
//       staleTime: Infinity,
//       initialData: {
//         study_id: "",
//         leader_name: "",
//         study_name: "",
//         title: "",
//         content: "",
//         start: "",
//         end: "",
//         deadline: "",
//         headcount: 0,
//         acceptcount: 0,
//         chat_link: "",
//         status: 0,
//       }, // 초기 데이터 타입에 맞게 설정해주세요
//     }
//   );
// };
