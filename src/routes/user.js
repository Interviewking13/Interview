// const { Router } = require('express');
// const router = Router();

const express = require('express');
const router = express.Router();
const userApi = require("../apis/user");


router.get('/userTest', userApi.userTest);
router.post('/postUserTest', userApi.postUserTest);

router.post('/register', userApi.registerUser);
router.post('/login', userApi.loginUser);
router.get('/mypage/:user_id', userApi.getUserInfo);
router.put('/mypage/:user_id', userApi.modifyUserInfo);
router.delete('/:user_id', userApi.deleteUser);


module.exports = router;

