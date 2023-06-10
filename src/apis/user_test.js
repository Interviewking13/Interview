const { User }  = require('../models/index');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const cookieParser = require('cookie-parser')
// app.use(cookieParser());    // 미들웨어이므로.. app.use(express.json()); 전에 위치해야함. // TO-DO: 미들웨어 만들면 console.log(req.cookies.token); 로 확인 가능. 

const secretKey = process.env.SECRET_KEY;

// const express = require('express');
const router = express.Router();

// 화살표 함수 형태
const userMiddlewareTest = async (req, res, next) => {
    console.log('미들웨어 실행! user_Test.js 도착!');
    // 미들웨어 로직 처리
    console.log(req.cookies.token);
    next();
};

// 객체 메소드 형태 - 실행이 왜 안되지! userApi 랑 뭔 차이지?
// const userMiddlewareTest = {        // 왜 이건 안맞지?
//     async userMiddlewareTest (req, res, next) {
//         console.log('미들웨어 실행! user_Test.js 파일 도착!');
//         // 미들웨어 로직 처리
//         console.log(req.cookies.token);
//         next();
//     }    
// };

module.exports = userMiddlewareTest;
