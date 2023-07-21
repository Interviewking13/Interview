const jwtToken = prompt("Enter JWT Token");

if (jwtToken) {
  // 헤더에 JWT 토큰 추가
  window.swaggerUi.api.clientAuthorizations.authz = {
    Authorization: `Bearer ${jwtToken}`,
  };
}