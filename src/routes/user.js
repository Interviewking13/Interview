const express = require('express');
const router = express.Router();

// middleware
const userTokenValidate = require("../middlewares/userTokenValidate");
const isLoginValidate = require("../middlewares/isLoginValidate");

// user API - Hierarchical Separation
const userController = require("../controllers/userController");

router.get('/login', isLoginValidate);                                          // 로그인 유효성 검사
router.get('/userInfo/:user_id', userTokenValidate, userController.getUserInfoById);    // user_id 정보 조회

router.post('/signup', userController.postSignUp);                              // 회원가입
router.post('/signin', userController.postSignIn);                              // 로그인
router.get('/mypage', userTokenValidate, userController.getUserInfoByHeader);   // 내 정보 조회
router.put('/mypage', userTokenValidate, userController.postUserInfo);          // 내 정보 수정
router.delete('/mypage', userTokenValidate, userController.deleteUserInfo);     // 회원탈퇴
router.post('/logout', userTokenValidate, userController.logoutUser);           // 로그아웃

module.exports = router;
