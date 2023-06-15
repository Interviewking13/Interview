// const { Router } = require('express');
// const router = Router();
const express = require('express');
const router = express.Router();

// middleware
const userTokenValidate = require("../middlewares/userTokenValidate");

const userApi = require("../apis/user");
const isLoginValidate = require("../middlewares/isLoginValidate");

// user API 테스트
router.get('/userInfo', userApi.getAllUserInfo);

// user 로그인 유효성 검사 테스트
// router.post('/userInfo', userApi.userApiIsLoginValidate);
router.post('/userInfo', isLoginValidate);

// user API 실제 기능
router.post('/register', userApi.registerUser);
router.post('/login', userApi.loginUser); 
// router.get('/mypage', userTokenValidate, userApi.getUserInfo);
// router.post('/mypage', userTokenValidate, userApi.getUserInfo);
router.get('/mypage', userApi.getUserInfo);                             // token 값  header로 받아주기
router.put('/mypage', userTokenValidate, userApi.modifyUserInfo);
router.delete('/mypage', userTokenValidate, userApi.deleteUser);
router.post('/logout', userTokenValidate, userApi.logoutUser);

module.exports = router;

