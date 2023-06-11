// 토큰 값을 쿠키에 저장

export const storeTokenInCookie = (token: string) => {
  const expires = new Date();
  // expires.setDate(expires.getDate() + 7); // 쿠키 만료 7일 후로 설정
  expires.setHours(expires.getHours() + 24); // 쿠키 만료 24시간 후로 설정

  const cookie = `token=${token}; expires=${expires.toUTCString()}; path=/`;
  document.cookie = cookie;
};
