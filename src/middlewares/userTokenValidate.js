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


const userTokenValidate = async (req, res, next) => {
  console.log('미들웨어 실행!');

  // 미들웨어 로직 처리


  next();
};


module.exports = userTokenValidate;

// function userTokenValidate(req, res, next) {
//   const { token } = req;

//   // TODO: 토큰을 인증하고 Payload 값을 얻어옵니다.
//   // 예시로는 JWT 토큰의 인증 로직을 사용하고 Payload 값을 req.user에 설정합니다.
//   try {
//     const payload = jwt.verify(token, secretKey);
//     req.user = payload;
//     next();
//   } catch (err) {
//     res.status(403).json({});
//   }
// }