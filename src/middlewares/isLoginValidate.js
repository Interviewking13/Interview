const { User }  = require('../models/index');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = process.env.SECRET_KEY;

/** login 유무 판별 조회 */
const isLoginValidate = async (req, res) => {     
    try {
        // console.log('로그인 유효성 검사 테스트!');
        // const { token } = req.body;
        // console.log(token + '/ userAPI');
        
        // 클라이언트로부터 전달된 헤더(토큰값) 사용 - token header로 로그인 유무 판단
        const token = req.headers.authorization;
                
        if (!token) {
            return res.status(401).json({
                resultCode: "401",
                message: "토큰이 없습니다. / 로그아웃상태"
            });
        }
        
        const decoded = jwt.verify(token, secretKey);

        // 토큰이 유효한 경우
        req.user = decoded;

        return res.status(200).json({
            resultCode: "200",
            message: "로그인 상태",
            data: {
                user_id: req.user.user_id,
                // token: token
            }
        });

    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
        // 토큰이 유효하지 않은 경우
        return res.status(401).json({
            resultCode: "403",
            message: "유효하지 않은 토큰입니다. / 로그아웃상태"
        });
        } else if (err.name === 'TokenExpiredError') {
        // 토큰이 만료된 경우
        return res.status(401).json({
            resultCode: "404",
            message: "만료된 토큰입니다. / 로그아웃상태"
        });
        } else {
        // 기타 토큰 검증 실패
        return res.status(500).json({
            resultCode: "500",
            message: "서버 오류 / 로그아웃상태"
        });
        }
    }
};

module.exports = isLoginValidate;
