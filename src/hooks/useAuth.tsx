import { useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

export const useAuth = (): void => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      alert("로그인 후 이용가능합니다");
      navigate(`/login`);
    }
  });
};
