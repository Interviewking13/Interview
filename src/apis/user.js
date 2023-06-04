const { User }  = require('../models/');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const userApi = {

    /** userApi get 방식 테스트 */
    async userTest(req, res, next) {
        try {
            //userApi 테스트
            res.send('userApi GET 방식 테스트');
            console.log('userApi 테스트1');        
        } catch (err) {
            console.error(err);
            res.status(500).json({
                resultCode: "500",
                message: "서버오류"
            })
        }
    },

    /** userApi post 방식 테스트 */
    async postUserTest(req, res, next) {
        try {
            const { title } = req.body;

            res.status(200).json({
                message: "post 방식 성공",
                data: title
            })
            
        } catch (err) {
            console.error(err);
            res.status(500).json({
                resultCode: "500",
                message: "서버오류"
            })
        }
    },

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
                data: findAllUser
            })
            // res.send(findAllUser);

        } catch (err) {
            console.error(err);
            res.status(500).json({
                resultCode: "500",
                message: "서버오류"
            })
        }
    },

    /** 회원가입 */
    async registerUser(req, res, next) {
        try {
            const { user_name, phone_number, email, password } = req.body;

            console.log(req.body);

            const newUser = {
                user_id,
                user_name,
                phone_number,  
                email,
                password,
                admin_yn: false
            }

            User.create(newUser);
            
            res.status(200).json({

                message: "회원가입 성공"
            })
        } catch (err) {
            console.error(err);
            res.status(500).json({
                resultCode: "500",
                message: "서버오류"
            })
        }
    },

    /** 로그인 */
    async loginUser(req, res, next) {
        try {

            res.send('로그인');
        } catch (err) {
            throw new Error(err);
        }
    },

    /** 내 정보 조회 */
    async getUserInfo(req, res) {
        try {
            const { user_id } = req.params;
            // const { user_id } = req.body;
            console.log(user_id);
            // const findUser = await User.findOne({ "user_id": user_id }); //확인완료
            const findUser = await User.findOne(
                { "_id": user_id },
                {
                    "_id": true,
                    "user_name": true,
                    "email": true,
                    "intro_yn": true,
                    "phone_number": true
                }
            )
            if (!findUser) {
                return res.status(400).json({
                    resultCode: "400",
                    message: "조회 실패"
                });
            }
            res.status(200).json({
                // data: findUser
                user_id: findUser._id,
                user_name: findUser.user_name,
                email: findUser.email,
                intro_yn: findUser.intro_yn,
                phone_number: findUser.phone_number
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                resultCode: "500",
                message: "서버오류"
            })
        }
    },

    /** 내 정보 수정 */
    async modifyUserInfo(req, res, next) {
        try {
            // const { user_id, email, password, intro_yn, phone_number } = req.body;
            const { email, password, intro_yn, phone_number } = req.body;

            // const findUser = await User.findOne({ "_id": user_id });    //나중에 user_id 값 사용가능하면? 사용가능할듯.
            const findUser = await User.findOne({ "email": email });

            if (!findUser) {
                return res.status(400).json({
                    resultCode: "400",
                    message: "해당 사용자를 찾을 수 없습니다."
                })
            }
            
            // 기존 사용자 정보
            const findUserId = findUser._id;
            const findUserEmail = findUser.email;
            const findUserPassword = findUser.password;
            const findUserIntro_yn = findUser.intro_yn;
            const findUserPhoneNumber = findUser.phone_number;

            console.log(findUser);

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
                    status: "200", 
                    message: "변경사항이 없습니다."
                });
            }   
            
            // 변경사항이 있을 경우 처리 로직
            const changeUserInfo = await User.updateOne({ "email": email },
            {
                $set: {
                    "password": password,
                    "intro_yn": intro_yn,
                    "phone_number": phone_number
                }
            });

            const changeFindUser = await User.findOne(
                { "_id": findUser._id },
                {
                    "_id": true,
                    "user_name": true,
                    "email": true,
                    "intro_yn": true,
                    "phone_number": true
                });

            return res.status(200).json({
                status: "200", 
                message: "내 정보 수정 성공",
                // data: changeUserInfo    // 안나와서 아래와 같이 수정
                data: {
                    user_id: findUser._id,
                    email: findUser._id,
                    intro_yn: findUser.intro_yn,
                    phone_number: findUser.phone_number, 
                }
                
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({
                resultCode: "500",
                message: "서버오류"
            })
        }
    },


    /** 회원탈퇴 */
    async deleteUser(req, res, next) {
        try {
            const { user_id } = req.body;

            // TO-DO
            const findUser = await User.findOne(
                { "_id": user_id },
                {
                    "_id": true,
                    "user_name": true,
                    "email": true,
                    "intro_yn": true,
                    "phone_number": true
                }
            )
            
            if(!findUser) {
                return res.status(400).json({
                    resultCode: "400",
                    message: "해당 사용자를 찾을 수 없습니다."
                })
            }
            
            // res.send('회원탈퇴 성공');
            res.status(200).json({
                resultCode: "200",
                message: "회원탈퇴 성공"
            })
        } catch (err) {
            console.error(err);
            res.status(500).json({
                resultCode: "500",
                message: "서버오류"
            })
        }
    }

}

module.exports = userApi;