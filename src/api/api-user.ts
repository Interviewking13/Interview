import axios from "axios";
// axios.defaults.withCredentials = true;

/* 인스턴스 네이밍 컨벤션 : 요청방식(ex get) + 해당 내용 + (by) + (파라미터/인자/쿼리) */

/** 회원가입 POST */
export const postSignUp = async (
  user_name: string,
  email: string,
  password: string
) => {
  const response = await axios.post(
    "http://34.22.79.51:5000/api/user/register",
    { user_name, email, password }
  );
  return response;
};

/** 로그인 POST */
export const postSignIn = async (email: string, password: string) => {
  const response = await axios.post("http://34.22.79.51:5000/api/user/login", {
    email,
    password,
  });
  return response;
};

/** 내 정보 조회 GET */
export const getUserData = async (user_id: string) => {
  const response = await axios.get(
    `http://34.22.79.51:5000/api/user/mypage/${user_id}`
  );
  return response;
};

/** 내 정보 수정 PUT */
export const putUserData = async (
  email: string,
  password: string,
  intro_yn: string,
  phone_number: string
) => {
  const response = await axios.put("http://34.22.79.51:5000/api/user/mypage", {
    email,
    password,
    intro_yn,
    phone_number,
  });
  return response;
};

/** 회원탈퇴 DELETE */
export const deleteUser = async (email: string, password: string) => {
  const response = await axios.delete(
    "http://34.22.79.51:5000/api/user/mypage",
    {
      data: { email, password },
    }
  );
  return response;
};
