const express = require('express');
const router = express.Router();

// middleware
const userTokenValidate = require("../middlewares/userTokenValidate");
const isLoginValidate = require("../middlewares/isLoginValidate");

// user API
// const userApi = require("../apis/user");
// router.get('/userApiTest', userApi.getAllUserInfo);                  // user API 테스트
// router.get('/login', isLoginValidate);                              // user 로그인 유효성 검사 테스트
// router.get('/userInfo/:user_id', userTokenValidate, userApi.getUserIdInfo);            // user_id 로 해당 사용자 정보 조회
// router.post('/register', userApi.registerUser);
// router.post('/login', userApi.loginUser); 
// router.get('/mypage', userTokenValidate, userApi.getUserInfo);                         // token 값 header로 받아주기
// router.put('/mypage', userTokenValidate, userApi.modifyUserInfo);
// router.delete('/mypage', userTokenValidate, userApi.deleteUser);
// router.post('/logout', userTokenValidate, userApi.logoutUser);

// user API - Hierarchical Separation
const userController = require("../controllers/userController");

// router.get('/login', isLoginValidate, userController.getUserInfoById);   // 로그인. 로그아웃할 때 user find 도 같이 해주자!
router.get('/login', isLoginValidate);
router.get('/userInfo/:user_id', userTokenValidate, userController.getUserInfoById);
router.get('/mypage', userTokenValidate, userController.getUserInfoByHeader);
router.post('/signup', userController.postSignUp);
router.post('/signin', userController.postSignIn);
router.post('userInfo', userTokenValidate, userController.postUserInfo);
router.get('/mypage', userTokenValidate, userController.deleteUser);
// router.post('/modify', isLoginValidate, userController.modifyUserInfo);

module.exports = router;
