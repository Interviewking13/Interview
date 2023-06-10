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
router.get('/mypage/:user_id', userApi.getUserInfo);
router.put('/mypage', userApi.modifyUserInfo);
router.delete('/mypage', userApi.deleteUser);

// user API 미들웨어 테스트 06.10
router.post('/userMiddlewareTest', userTokenValidate, userMiddlewareTest);
router.post('/userMiddlewareTest2', userTokenValidate, userApi.userMiddlewareApiTest);

module.exports = router;

