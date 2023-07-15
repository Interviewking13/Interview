const express = require('express');
const router = express.Router();

// middleware
const userTokenValidate = require("../middlewares/userTokenValidate");

const userApi = require("../apis/user");
const isLoginValidate = require("../middlewares/isLoginValidate");

router.get('/userApiTest', userApi.getAllUserInfo);                  // user API 테스트
router.get('/login', isLoginValidate);                              // user 로그인 유효성 검사 테스트
router.get('/userInfo/:user_id', userTokenValidate, userApi.getUserIdInfo);            // user_id 로 해당 사용자 정보 조회
router.post('/register', userApi.registerUser);
router.post('/login', userApi.loginUser); 
router.get('/mypage', userTokenValidate, userApi.getUserInfo);                         // token 값 header로 받아주기
router.put('/mypage', userTokenValidate, userApi.modifyUserInfo);
router.delete('/mypage', userTokenValidate, userApi.deleteUser);
router.post('/logout', userTokenValidate, userApi.logoutUser);

// const userController = require('../controllers/userController');

// router.post('/modify', isLoginValidate, userController.modifyUserInfo);

module.exports = router;
