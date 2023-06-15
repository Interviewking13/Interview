const { User }  = require('../models/index');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = process.env.SECRET_KEY;

const userTokenValidate = async (req, res, next) => {
  // console.log('미들웨어 실행!');

  // 쿠키값 사용 주석 처리
  // const token = req.cookies.token;

  // json body (localStorage 값 사용)
  const { token } = req.body;
  console.log(token);

  if (!token) {
    return res.status(401).json({
      resultCode: "401",
      message: "토큰이 없습니다."
    });
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    // 토큰이 유효한 경우
    req.user = decoded;
    // console.log(decoded.user_id);
    // console.log(req.user.user_id);

    // TO-DO: 현재 사용자 검사 (isLoginValidate 의 user_id 와 비교해서 안되면 팅겨버리는 로직 추가하자)

    // 현재 사용자 검사(기본) -> 이렇게 하면 다른곳에서도 currentUser 정보를 사용할 수 있겠네.. !
    // response값을 더 줘서 값을 활용 많이하계끔해야하나?
    // const currentUser = await User.findOne({ "_id": user_id });

    // if (!currentUser) {
    //   return res.status(400).json({
    //       resultCode: "400",
    //       message: "해당 사용자를 찾을 수 없습니다."
    //   });
    // }

    // if (currentUser) {
    //     return res.status(400).json({
    //         resultCode: "400",
    //         message: "사용자 정보가 존재합니다.",
    //         data: {
    //             user_id: currentUser._id
    //         }
    //     });
    // }    
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      // 토큰이 유효하지 않은 경우
      return res.status(401).json({
        resultCode: "401",
        message: "유효하지 않은 토큰입니다."
      });
    } else if (err.name === 'TokenExpiredError') {
      // 토큰이 만료된 경우
      return res.status(401).json({
        resultCode: "401",
        message: "만료된 토큰입니다."
      });
    } else {
      // 기타 토큰 검증 실패
      return res.status(500).json({
        resultCode: "500",
        message: "서버 오류"
      });
    }
  }
};

module.exports = userTokenValidate;
