const { User }  = require('../models/index');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = process.env.SECRET_KEY;

// dts_insert, dts_update 필드에 삽입할 변수 값 설정
const currentDate = new Date();
const dateString = currentDate.toISOString().slice(0, 10).replace(/-/g, "");    // 현재 날짜를 "yyyymmdd" 형식으로 가져옵니다
const timeString = currentDate.toTimeString().slice(0, 8).replace(/:/g, "");    // 현재 시간을 "hhmmss" 형식으로 가져옵니다

const userApi = {

    /** user 정보 전체 DB 조회 테스트 */
    async getAllUserInfo(req, res, next) {
        try {
            const findAllUser = await User.find({});

            if (!findAllUser) {
                return res.status(400).json({
                    resultCode: "400",
                    message: "조회 실패"
                });
            }

            res.status(200).json({
                resultCode: "200",
                message: "조회 성공",
            })

        } catch (err) {
            console.error(err);
            res.status(500).json({
                resultCode: "500",
                message: "서버오류"
            });
        }
    },

    /** 회원가입 */
    async registerUser(req, res, next) {
        try {
            const { user_name, email, password, passwordCheck } = req.body;

            // 입력값 검사
            if (user_name === "" || email === "" || password === "" || passwordCheck === "") {
                return res.status(200).json({
                    resultCode: 200,
                    message: "정보를 모두 입력하세요."
                });
            }

            // 비밀번호, 비밀번호 확인 값 검사
            if (password !== passwordCheck) {
                return res.status(200).json({
                    resultCode: 200,
                    message: "비밀번호가 일치하지 않습니다."
                });
            }
            
            // 기존 사용자(이메일) 유무 검사
            const findUser = await User.findOne({ "email": email });

            if (findUser) {
                return res.status(200).json({
                    resultCode: "200",
                    message: "기존에 이미 가입되어 있는 회원입니다.",
                    data: {
                        user_id: findUser._id,
                        email: findUser.email
                    }
                });
            }
            
            // 비밀번호 암호화
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUserInfo = {
                user_name,
                email,
                password: hashedPassword,
                dts_insert: dateString + timeString,
                dts_update: null
            }

            const newUser = await User.create(newUserInfo);
            
            res.status(200).json({
                resultCode: "200",
                message: "회원가입 성공",
                data: {
                    user_id: newUser._id,
                    email: newUser.email
                }
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                resultCode: "500",
                message: "서버오류"
            });
        }
    },

    /** 로그인 */
    async loginUser(req, res, next) {
        try {
            
            const { email, password } = req.body;

            // 기존 사용자 유무 검사
            const findUser = await User.findOne({ "email": email });

            if (!findUser) {
                return res.status(200).json({
                    resultCode: "200",
                    message: "사용자가 존재하지 않습니다."
                })
            }

            // 비밀번호 검증
            const isPasswordValid = await bcrypt.compare(password, findUser.password);      // 평문값과 암호화값 비교

            if (!isPasswordValid) {
                return res.status(200).json({
                resultCode: "200",
                message: "비밀번호가 맞지 않습니다."
                });
            }

            // JWT 토큰 생성
            const payload = {
                email
            }
            const token = jwt.sign(payload, secretKey, { expiresIn: "5m" });//  만료시간 
            
            res.status(200).json({
                resultCode: "200",
                message: "로그인 성공",
                data: {
                    user_id: findUser._id,
                    email,
                    token
                }
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({
                resultCode: "500",
                message: "서버오류"
            });
        }
    },

    /** 내 정보 조회 */
    async getUserInfo(req, res) {
        
        // const secretKey = 'your_test_key';
        const token = req.headers.authorization;    // 클라이언트로부터 전달된 토큰 값
            
        try {
            
            const { user_id } = req.params;

            const decoded = jwt.verify(token, secretKey);
            
            if (!decoded) {
                return res.status(401).json({
                resultCode: "401",
                message: "유효하지 않은 토큰입니다.",
                token: token
                });
            }

            const findUser = await User.findOne(
                { "_id": user_id },
                {
                    "_id": true,
                    "user_name": true,
                    "email": true,
                    "intro_yn": true,
                    "phone_number": true
                }
            );
            
            if (!findUser) {        // 여기로 안들어오네?
                return res.status(400).json({
                    resultCode: "400",
                    message: "조회 실패"
                });
            }
            
            res.status(200).json({
                // data: findUser
                resultCode: "200",
                message: "인증된 토큰입니다.",
                user_id: findUser._id,
                user_name: findUser.user_name,
                email: findUser.email,
                intro_yn: findUser.intro_yn,
                phone_number: findUser.phone_number,
                token: token
            });
        } catch (err) {
            console.error(err);
            if (err.name === 'JsonWebTokenError') {
                // 토큰이 유효하지 않은 경우
                return res.status(401).json({
                    resultCode: "401",
                    message: "유효하지 않은 토큰입니다.",
                    token: token
                });
            }
            else if (err.name === 'TokenExpiredError') {
                // 토큰이 만료되었을 경우
                return res.status(401).json({
                    resultCode: "401",
                    message: "만료된 토큰입니다.",
                    token: token
                });
            } else {
                //기타 토큰 검증 실패
                return res.status(500).json({
                    resultCode: "500",
                    message: "서버오류"
                });
            }
        }
    },

    /** 내 정보 수정 */
    async modifyUserInfo(req, res, next) {
        // const secretKey = 'your_test_key';
        const token = req.headers.authorization;    // 클라이언트로부터 전달된 토큰 값
            
        try {
            const { user_id, email, password, intro_yn, phone_number } = req.body;
            // const { email, password, intro_yn, phone_number } = req.body;

            const findUser = await User.findOne({ "_id": user_id });    //나중에 user_id 값 사용가능하면? 사용가능할듯.
            // const findUser = await User.findOne({ "email": email });

            if (!findUser) {
                return res.status(400).json({
                    resultCode: "400",
                    message: "해당 사용자를 찾을 수 없습니다."
                });
            }
            
            const decoded = jwt.verify(token, secretKey);
            
            if (!decoded) {
                return res.status(401).json({
                resultCode: "401",
                message: "유효하지 않은 토큰입니다.",
                token: token
                });
            }

            // 기존 사용자 정보
            const findUserId = findUser._id;
            const findUserEmail = findUser.email;
            const findUserPassword = findUser.password;
            const findUserIntro_yn = findUser.intro_yn;
            const findUserPhoneNumber = findUser.phone_number;

            // 변경사항 있는지 확인
            let isModified = false;

            if (email !== findUserEmail) {
                findUser.email = email;
                isModified = true;
            }
            if (password !== findUserPassword) {
                findUser.password = password;
                isModified = true;
            }
            if (intro_yn !== findUserIntro_yn) {
                findUser.intro_yn = intro_yn;
                isModified = true;
            }
            if (phone_number !== findUserPhoneNumber) {
                findUser.phone_number = phone_number;
                isModified = true;
            }

            // 변경사항이 없는 경우의 처리 로직
            if(!isModified) {
                return res.status(200).json({
                    resultCode: "200", 
                    message: "변경사항이 없습니다."
                });
            }   
            
            // 비밀번호 암호화
            const hashedPassword = await bcrypt.hash(password, 10);

            // 변경사항이 있을 경우 처리 로직
            const changeUserInfo = await User.updateOne({ "email": email },
            {
                $set: {
                    "password": hashedPassword,
                    "intro_yn": intro_yn,
                    "phone_number": phone_number,
                    "dts_update": dateString + timeString
                }
            });

            const updatedUser = await User.findOne(
                { "_id": findUser._id },
                {
                    "_id": true,
                    "user_name": true,
                    "email": true,
                    "intro_yn": true,
                    "phone_number": true
                });

            return res.status(200).json({
                resultCode: "200", 
                message: "내 정보 수정 성공",
                data: {
                    user_id: updatedUser._id,
                    email: updatedUser.email,
                    intro_yn: updatedUser.intro_yn,
                    phone_number: updatedUser.phone_number, 
                }
                
            });
        } catch (err) {
                console.error(err);
                if (err.name === 'JsonWebTokenError') {
                    // 토큰이 유효하지 않은 경우
                    return res.status(401).json({
                        resultCode: "401",
                        message: "유효하지 않은 토큰입니다.",
                        token: token
                    });
                }
                else if (err.name === 'TokenExpiredError') {
                    // 토큰이 만료되었을 경우
                    return res.status(401).json({
                        resultCode: "401",
                        message: "만료된 토큰입니다.",
                        token: token
                    });
                } else {
                    //기타 토큰 검증 실패
                    return res.status(500).json({
                        resultCode: "500",
                        message: "서버오류"
                    });
                }
            }
    },


    /** 회원탈퇴 */
    async deleteUser(req, res, next) {
        
        const token = req.headers.authorization;    // 클라이언트로부터 전달된 토큰 값

        try {
            const decoded = jwt.verify(token, secretKey);
            
            if (!decoded) {
                return res.status(401).json({
                resultCode: "401",
                message: "유효하지 않은 토큰입니다.",
                token: token
                });
            }
            
            const { user_id, email, password } = req.body;

            const findUser = await User.findOne({ "_id": user_id });

            if (!findUser) {
                return res.status(400).json({
                    resultCode: "400",
                    message: "해당 사용자를 찾을 수 없습니다."
                });
            }
            
            // 비밀번호 검증
            const isPasswordValid = await bcrypt.compare(password, findUser.password);      // 평문값과 암호화값 비교

            if (!isPasswordValid) {
                return res.status(200).json({
                resultCode: "200",
                message: "비밀번호가 맞지 않아 탈퇴할 수 없습니다."
                });
            }

            // 회원 탈퇴
            await User.deleteOne({ "_id": user_id });

            res.status(200).json({
                resultCode: "200",
                message: "회원탈퇴 성공"
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({
                resultCode: "500",
                message: "서버오류"
            });
        }
    }

}

module.exports = userApi;