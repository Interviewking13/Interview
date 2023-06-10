function userTokenValidate(req, res, next) {
  const { token } = req;

  // TODO: 토큰을 인증하고 Payload 값을 얻어옵니다.
  // 예시로는 JWT 토큰의 인증 로직을 사용하고 Payload 값을 req.user에 설정합니다.
  try {
    const payload = jwt.verify(token, secretKey);
    req.user = payload;
    next();
  } catch (err) {
    res.status(403).json({});
  }
}