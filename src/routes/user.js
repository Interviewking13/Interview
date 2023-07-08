<<<<<<< HEAD
=======
// const { Router } = require('express');
// const router = Router();
>>>>>>> 370402ba4b12cfb101ad0f98bd5f4fe34137b784
const express = require('express');
const router = express.Router();

// middleware
const userTokenValidate = require("../middlewares/userTokenValidate");

const userApi = require("../apis/user");
const isLoginValidate = require("../middlewares/isLoginValidate");

<<<<<<< HEAD
// user API 테스트
router.get('/userApiTest', userApi.getAllUserInfo);

router.get('/login', isLoginValidate);                              // user 로그인 유효성 검사 테스트
router.get('/userInfo/:user_id', userApi.getUserIdInfo);            // user_id 로 해당 사용자 정보 조회
router.post('/register', userApi.registerUser);
router.post('/login', userApi.loginUser); 
router.get('/mypage', userApi.getUserInfo);                         // token 값 header로 받아주기
router.put('/mypage', userTokenValidate, userApi.modifyUserInfo);
router.delete('/mypage', userTokenValidate, userApi.deleteUser);
router.post('/logout', userTokenValidate, userApi.logoutUser);

module.exports = router;

=======
router.get('/login', isLoginValidate);                              // user 로그인 유효성 검사 테스트
router.get('/userInfo/:user_id', userApi.getUserIdInfo);            // user_id 로 해당 사용자 정보 조회
router.post('/register', userApi.registerUser);
router.post('/login', userApi.loginUser); 
router.get('/mypage', userApi.getUserInfo);                         // token 값 header로 받아주기
router.put('/mypage', userTokenValidate, userApi.modifyUserInfo);
router.delete('/mypage', userTokenValidate, userApi.deleteUser);
router.post('/logout', userTokenValidate, userApi.logoutUser);

module.exports = router;

>>>>>>> 370402ba4b12cfb101ad0f98bd5f4fe34137b784
