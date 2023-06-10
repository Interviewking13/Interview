// const { Router } = require('express');
// const router = Router();

const express = require('express');
const router = express.Router();
const userApi = require("../apis/user");
// const userTokenValidate = require("../middlewares/userTokenValidate");

//user API 테스트
router.get('/userInfo', userApi.getAllUserInfo);

//user API 실제 기능
router.post('/register', userApi.registerUser);
router.post('/login', userApi.loginUser);
router.get('/mypage/:user_id', userApi.getUserInfo);
router.put('/mypage', userApi.modifyUserInfo);
router.delete('/mypage', userApi.deleteUser);

module.exports = router;

