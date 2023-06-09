import axios from "axios";
// axios.defaults.withCredentials = true;

/** 스터디 신청 (원) post */
export const postApplyStudy = async (
  study_id: string,
  goal: string
): Promise<void> => {
  try {
    const result = await axios.post("http://34.22.79.51:5000/api/study/apply", {
      study_id,
      goal,
    });
    console.log(result);
    // 원하는 방식으로 결과를 처리할 수 있습니다.
  } catch (error) {
    console.error(error);
  }
};
