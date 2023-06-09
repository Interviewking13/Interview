import axios from "axios";

/* 인스턴스 네이밍 컨벤션 : 요청방식(ex get) + 해당 내용 + (by) + (파라미터/인자/쿼리) */

/** 스터디 정보 수정 (장)  get */
export const putInfoStudy = async (
  study_id: string,
  data: {
    study_name: string;
    title: string;
  }
) => {
  const result = await axios.put(
    `http://34.22.79.51:5000/api/info/${study_id}`,
    {
      study_name: data.study_name,
      title: data.title,
    }
  );
  return result;
};
