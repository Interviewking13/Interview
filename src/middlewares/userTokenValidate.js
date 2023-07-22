const { User }  = require('../models/index');

const express = require('express');
// const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = process.env.SECRET_KEY;

const userTokenValidate = async (req, res, next) => {
  try {
    // 클라이언트로부터 전달된 헤더(토큰값) 사용 - token header로 로그인 유무 판단
    const token = req.headers.authorization;
    // console.log(token + '/ userAPI - getUserInfo - getUserIdInfo');
    console.log(token);
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded);
    req.user = decoded;
    
    // user_id가 존재하지 않거나 user_id와 일치하지 않을 경우 에러 처리
    if (!decoded) {
        return res.status(401).json({
        resultCode: "401",
        message: "Unauthorized token / 권한이 없습니다.",
        token: token
        });
    }
    
    // return res.status(200).json({
    //   resultCode: "200",
    //   message: "유효한 토큰",
    //   data: {
    //       user_id: req.user.user_id,
    //       // token: token
    //   }
    // });

    next();

    // 클라이언트로부터 전달된 바디(토큰값) 사용
    // const { token } = req.body;  
    // if (!token) {
    //   return res.status(401).json({
    //     resultCode: "401",
    //     message: "토큰이 없습니다."
    //   });
    // }
  
    // const decoded = jwt.verify(token, secretKey);
    // req.user = decoded;

  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      // 토큰이 유효하지 않은 경우
      return res.status(401).json({
        resultCode: "403",
        message: "Invalid token / 유효하지 않은 토큰입니다."
      });
    } else if (err.name === 'TokenExpiredError') {
      // 토큰이 만료된 경우
      return res.status(401).json({
        resultCode: "404",
        message: "Expired token / 만료된 토큰입니다."
      });
    } else {
      // 기타 토큰 검증 실패
      return res.status(500).json({
        resultCode: "500",
        message: "Invalid error"
      });
    }
  }
};

module.exports = userTokenValidate;