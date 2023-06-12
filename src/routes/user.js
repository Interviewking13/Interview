// const { Router } = require('express');
// const router = Router();
const express = require('express');
const router = express.Router();

// middleware
const userTokenValidate = require("../middlewares/userTokenValidate");

const userApi = require("../apis/user");
const userMiddlewareTest = require("../apis/user_test");

// user API 테스트
router.get('/userInfo', userApi.getAllUserInfo);

// user API 실제 기능
router.post('/register', userApi.registerUser);
router.post('/login', userApi.loginUser);
// router.get('/mypage/:user_id', userTokenValidate, userApi.getUserInfo);     
router.get('/mypage', userTokenValidate, userApi.getUserInfo);     // middleware :user_id 제거 테스트
router.put('/mypage', userTokenValidate, userApi.modifyUserInfo);
router.delete('/mypage', userTokenValidate, userApi.deleteUser);

// user API middleware 이용 테스트 06.10
// router.post('/userMiddlewareTest', userTokenValidate, userMiddlewareTest);
router.post('/userMiddlewareTest2', userTokenValidate, userApi.userMiddlewareApiTest);

module.exports = router;

