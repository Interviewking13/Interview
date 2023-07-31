import { QueryFunction, QueryFunctionContext, QueryKey } from 'react-query';
import { axiosInstance } from './axiosInstance';
// axios.defaults.withCredentials = true;

/* 인스턴스 네이밍 컨벤션 : 요청방식(ex get) + 해당 내용 + (by) + (파라미터/인자/쿼리) */

/** 1. 스터디 개설 (장) post */
export const postCreateStudy = async (
    token: string,
    _id: string,
    study_name: string,
    title: string,
    content: string,
    deadline: string,
    headcount: number,
    chat_link: string,
    status: number,
    start: string,
    end: string,
    leader_name: string,
    leader_id: string
) => {
    const response = await axiosInstance.post(
        'study/create',
        {
            study_name,
            title,
            content,
            deadline,
            headcount,
            chat_link,
            status,
            start,
            end,
            leader_name,
            leader_id,
        },
        {
            headers: {
                Authorization: token,
            },
        }
    );
    return response;
};

/** 2. 스터디 신청 (원) post */
export const postApplyStudy = async (token: string, study_id: string, goal: string) => {
    const response = await axiosInstance.post(
        'study/apply',
        {
            study_id,
            goal,
        },
        {
            headers: {
                Authorization: token,
            },
        }
    );
    return response;
};

/** 3. 스터디 신청 수락 (장)  put */
export const putAcceptStudy = async (token: string, study_id: string, member_id: string, accept: number) => {
    const response = await axiosInstance.put(
        `study/accept/${study_id}/${member_id}`,
        {
            accept,
        },
        {
            headers: {
                Authorization: token,
            },
        }
    );
    return response;
};

/** getInfoAllStudyData 반환 타입 지정 */
type StudyData = {
    _id: string;
    title: string;
    acceptcount: number;
    headcount: number;
    start: string;
    end: string;
    deadline: string;
    leader_name: string;
};

/** 4. 스터디 정보 조회 (전체)  get */
export const getInfoAllStudyData = async (): Promise<StudyData[]> => {
    try {
        const response = await axiosInstance.get('study/info');
        return response.data; // 응답 데이터만 반환
    } catch (error) {
        throw new Error('Error occurred while fetching data');
    }
};

/** 5. 스터디 정보 조회 (개별)  get */
export const getInfoStudyData1: QueryFunction<any, string[]> = async ({ queryKey }: QueryFunctionContext<string[]>) => {
    if (queryKey.length !== 2) {
        throw new Error('Invalid queryKey');
    }

    const study_id = queryKey[1];
    const response = await axiosInstance.get(`study/info/${study_id}`);
    return response.data;
};

/** 5. 스터디 정보 조회 (개별)  get */
export const getInfoStudyData = async (study_id: string) => {
    const response = await axiosInstance.get(`study/info/${study_id}`);
    return response;
};

/** 6. 스터디 정보 수정 (장)  put */
export const putInfoStudy = async (
    token: string,
    study_id: string,
    data: {
        study_name: string;
        title: string;
        content: string;
        start: string;
        end: string;
        deadline: string;
        headcount: number;
        chat_link: string;
        status: number;
    }
) => {
    const response = await axiosInstance.put(
        `study/info/${study_id}`,
        {
            study_name: data.study_name,
            title: data.title,
            content: data.content,
            start: data.start,
            end: data.end,
            deadline: data.deadline,
            headcount: data.headcount,
            chat_link: data.chat_link,
            status: data.status,
        },
        {
            headers: {
                Authorization: token,
            },
        }
    );
    return response;
};

/** 7. 스터디 회원 관리 (장)  delete */
export const deleteStudyMember = async (token: string, study_id: string, member_id: string) => {
    const response = await axiosInstance.delete(`study/${study_id}/${member_id}`, {
        headers: {
            Authorization: token,
        },
    });
    return response;
};

/** 8. 스터디 삭제 (장)  delete */
export const deleteStudy = async (token: string, study_id: string) => {
    const response = await axiosInstance.delete(`study/${study_id}`, {
        headers: {
            Authorization: token,
        },
    });
    return response;
};

/** 9. 스터디 신청원 조회  get */
export const getStudyAccept = async (study_id: string, accept: number) => {
    const response = await axiosInstance.get(`study/accept/${study_id}/${accept}`);
    return response;
};
