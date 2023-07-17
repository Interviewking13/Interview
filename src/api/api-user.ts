import { axiosInstance } from './axiosInstance';

/* 인스턴스 네이밍 컨벤션 : 요청방식(ex get) + 해당 내용 + (by) + (파라미터/인자/쿼리) */

/** 1. 회원가입 POST */
export const postSignUp = async (
    user_name: string,
    email: string,
    password: string,
    passwordCheck: string,
    phone_number: number
) => {
    const response = await axiosInstance.post('user/register', {
        user_name,
        email,
        password,
        passwordCheck,
        phone_number,
    });
    return response;
};

/** 2. 로그인 POST */
export const postSignIn = async (email: string, password: string) => {
    const response = await axiosInstance.post('user/login', {
        email,
        password,
    });
    return response;
};

/** 3. 내 정보 조회 GET*/
export const getUserData = async (token: string) => {
    const response = await axiosInstance.get('user/mypage', {
        headers: {
            Authorization: `${token}`,
        },
    });
    return response.data;
};

/** 4. 내 정보 수정 PUT */
export const putUserData = async (
    token: string,
    email: string,
    password: string,
    intro_yn: string,
    phone_number: string,
    file_name: string,
    file_key: string
) => {
    const response = await axiosInstance.put(
        'user/mypage',
        {
            data: {
                email,
                password,
                intro_yn,
                phone_number,
                file_name,
                file_key,
            },
        },
        {
            headers: {
                Authorization: `${token}`,
            },
        }
    );
    return response.data;
};

/** 5. 회원탈퇴 DELETE */
export const deleteUser = async (user_id: string, email: string, password: string, token: string) => {
    const response = await axiosInstance.delete('user/mypage', {
        data: { user_id, email, password },
        headers: {
            Authorization: `${token}`,
        },
    });
    return response;
};

/** 6. 로그아웃 POST */
export const postLogout = async (token: string) => {
    const response = await axiosInstance.post('user/logout', {
        headers: {
            Authorization: `${token}`,
        },
    });
    return response;
};

/** 7. 유저 정보 조회 GET */
export const getUserDataById = async (token: string, user_id: string) => {
    const response = await axiosInstance.get(`user/userInfo/${user_id}`, {
        headers: {
            Authorization: `${token}`,
        },
    });
    return response.data;
};
