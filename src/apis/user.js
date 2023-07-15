const { User }  = require('../models/index');

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = process.env.SECRET_KEY;

const { validateEmail } = require('../utils/user.js')

// dts_insert, dts_update 필드에 삽입할 변수 값 설정
const currentDate = new Date();
const dateString = currentDate.toISOString().slice(0, 10).replace(/-/g, "");    // 현재 날짜를 "yyyymmdd" 형식으로 설정
const timeString = currentDate.toTimeString().slice(0, 8).replace(/:/g, "");    // 현재 시간을 "hhmmss" 형식으로 설정

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
    
    /** user_id 로 사용자 정보 조회 */
    async getUserIdInfo(req, res, next) {
        try {
            const { user_id } = req.params;

            const findUser = await User.findOne({ "_id": user_id });    //나중에 user_id 값 사용가능하면? 사용가능할듯.
            
            if (!findUser) {
                return res.status(400).json({
                    resultCode: "400",
                    message: "해당 사용자를 찾을 수 없습니다."
                });
            }

            return res.status(200).json({
                resultCode: "200", 
                message: "사용자 정보 조회 성공",
                data: {
                    user_id: findUser._id,
                    user_name: findUser.user_name,
                    email: findUser.email,
                    intro_yn: findUser.intro_yn,
                    phone_number: findUser.phone_number, 
                    file_key: findUser.file_key, 
                    file_name: findUser.file_name
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


    /** 회원가입 */
    async registerUser(req, res, next) {
        try {
            const { user_name, email, password, passwordCheck, phone_number } = req.body;

            // 입력값 검사
            if (user_name === "" || email === "" || password === "" || passwordCheck === "" || phone_number === "") {
                return res.status(400).json({
                    resultCode: 400,
                    message: "정보를 모두 입력하세요."
                });
            }

            // 이메일 형식 유효성 검사
            if (!validateEmail(email)) {
                return res.status(400).json({
                    resultCode: "400",
                    message: "올바른 이메일 형식이 아닙니다."
                })
            }

            // 비밀번호, 비밀번호 확인 값 검사
            if (password !== passwordCheck) {
                return res.status(400).json({
                    resultCode: 400,
                    message: "비밀번호가 일치하지 않습니다."
                });
            }
            
            // 기존 사용자(이메일) 유무 검사
            const findUser = await User.findOne({ "email": email });

            if (findUser) {
                return res.status(400).json({
                    resultCode: "400",
                    message: "기존에 가입되어 있는 회원입니다.",
                    data: {
                        user_id: findUser._id,
                        email: findUser.email
                    }
                });
            }
            
            // 비밀번호 암호화
            const hashedPassword = await bcrypt.hash(password, 10);

            // 계정 생성 정보
            const newUserInfo = {
                user_name,
                email,
                password: hashedPassword,
                phone_number,
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

            // 입력값 검사
            if (email === "" || password === "") {
                return res.status(400).json({
                    resultCode: 400,
                    message: "정보를 모두 입력하세요."
                });
            }

            // 이메일 형식 유효성 검사
            if (!validateEmail(email)) {
                return res.status(400).json({
                    resultCode: "400",
                    message: "올바른 이메일 형식이 아닙니다."
                })
            }

            // 기존 사용자 유무 검사
            const findUser = await User.findOne({ "email": email });

            if (!findUser) {
                return res.status(200).json({
                    resultCode: "400",
                    message: "사용자가 존재하지 않습니다."
                })
            }

            // 비밀번호 검증
            const isPasswordValid = await bcrypt.compare(password, findUser.password);

            if (!isPasswordValid) {
                return res.status(400).json({
                resultCode: "400",
                message: "비밀번호가 맞지 않습니다."
                });
            }

            // JWT 토큰 생성
            const payload = {
                user_id: findUser._id,          // 사용자의 MongoDB ObjectID
            }

            const token = jwt.sign(payload, secretKey, { expiresIn: "3d" }); 

            res.status(200)
                .set('Authorization', token)
                .json({
                    resultCode: "200",
                    message: "로그인 성공",
                    data: {
                        user_id: findUser._id,
                        user_name: findUser.user_name,
                        email,
                        token
                    }
                });
 
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                resultCode: "500",
                message: "서버오류"
            });
        }
    },

    /** 내 정보 조회 */
    async getUserInfo(req, res) {    
        try {
            const { user_id } = req.user;
            console.log(user_id);

            const findUser = await User.findOne(
                { "_id": user_id },
                {
                    "_id": true,
                    "user_name": true,
                    "email": true,
                    "intro_yn": true,
                    "phone_number": true,
                    "file_key": true, 
                    "file_name": true
                }
            );
            
            if (!findUser) {        // 여기로 안들어오네?
                return res.status(400).json({
                    resultCode: "400",
                    message: "조회 실패"
                });
            }
            
            res.status(200).json({
                resultCode: "200",
                message: "인증된 토큰입니다.",
                data: {
                    user_id: findUser._id,
                    user_name: findUser.user_name,
                    email: findUser.email,
                    intro_yn: findUser.intro_yn,
                    phone_number: findUser.phone_number,
                    file_key: findUser.file_key, 
                    file_name: findUser.file_name
                }
            });
        } catch (err) {
            console.error(err);
        }
    },

    /** 내 정보 수정 */
    async modifyUserInfo(req, res, next) {
        try {
            const { user_id } = req.user;
            console.log(user_id);

            const { email, password, passwordCheck, intro_yn, phone_number, file_key, file_name } = req.body;

            const findUser = await User.findOne({ "_id": user_id });    //나중에 user_id 값 사용가능하면? 사용가능할듯.
            // const findUser = await User.findOne({ "email": email });

            if (!findUser) {
                return res.status(400).json({
                    resultCode: "400",
                    message: "해당 사용자를 찾을 수 없습니다."
                });
            }

            // 비밀번호, 비밀번호 확인 값 검사
            if (password !== passwordCheck) {
                return res.status(400).json({
                    resultCode: 400,
                    message: "비밀번호가 일치하지 않습니다."
                });
            }
            
            // 기존 사용자 정보
            const findUserId = findUser._id;
            const findUserEmail = findUser.email;
            const findUserPassword = findUser.password;
            const findUserIntro_yn = findUser.intro_yn;
            const findUserPhoneNumber = findUser.phone_number;
            const findUserFileKey = findUser.file_key;
            const findUserFileName = findUser.file_name;

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
            if (file_key !== findUserFileKey) {
                findUser.file_key = file_key;
                isModified = true;
            }
            if (file_name !== findUserFileName) {
                findUser.file_name = file_name;
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
                    "dts_update": dateString + timeString,
                    "file_key": file_key,
                    "file_name": file_name
                }
            });

            const updatedUser = await User.findOne(
                { "_id": findUser._id },
                {
                    "_id": true,
                    "user_name": true,
                    "email": true,
                    "intro_yn": true,
                    "phone_number": true,
                    "file_key": true, 
                    "file_name": true
                });

            return res.status(200).json({
                resultCode: "200", 
                message: "내 정보 수정 성공",
                data: {
                    user_id: updatedUser._id,
                    user_name: updatedUser.user_name,
                    email: updatedUser.email,
                    intro_yn: updatedUser.intro_yn,
                    phone_number: updatedUser.phone_number, 
                    file_key: updatedUser.file_key, 
                    file_name: updatedUser.file_name
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


    /** 회원탈퇴 */
    async deleteUser(req, res, next) {
        try {
            const { user_id } = req.user;
            console.log(user_id);

            const { email, password } = req.body;

            const findUser = await User.findOne({ "_id": user_id });

            if (!findUser) {
                return res.status(400).json({
                    resultCode: "400",
                    message: "해당 사용자를 찾을 수 없습니다."
                });
            }
            
            // 비밀번호 검증
            const isPasswordValid = await bcrypt.compare(password, findUser.password);

            if (!isPasswordValid) {
                return res.status(200).json({
                resultCode: "200",
                message: "비밀번호가 맞지 않아 탈퇴할 수 없습니다."
                });
            }

            // 회원 탈퇴
            await User.deleteOne({ "_id": user_id });

            res.setHeader('Authorization', '');
            res.clearCookie('token');

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
    },

    /** 로그아웃 */
    async logoutUser (req, res, next) {
        try {
            const { user_id } = req.user;
            console.log(user_id);

            if (user_id) {
                res.setHeader('Authorization', '');
                res.clearCookie('token');
     
                return res.status(200).json({
                    resultCode: "200",
                    message: "로그아웃 성공"
                });
            } else {
                return res.status(400).json({
                    resultCode: "400",
                    message: "사용자 정보를 찾을 수 없습니다.",
                });
            }
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
