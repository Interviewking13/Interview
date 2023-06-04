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
            throw new Error(err);
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
            throw new Error(err);
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
            console.log(err);
            throw new Error(err);
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
            const { user_id, email, password, intro_yn, phone_number } = req.body;
            const findUser = await User.findOne({ user_id });
            const findInfo = User.update({ "email": email },
                                {
                                    $set: {
                                        "email": email, 
                                        "password": password,
                                        "intro_yn": intro_yn,		//근데 기존에 값이 있고 그냥 다른 값만 변경하는 거라면 바꿔주기?
                                        "phone_number": phone_number
                                    }
                                })
            if (!findInfo) {
                return res.status(400).json( { message: "내 정보 수정 실패" });
            }
            res.send('내 정보 수정');
        } catch (err) {
            throw new Error(err);
        }
    },


    /** 회원탈퇴 */
    async deleteUser(req, res, next) {
        try {

            res.send('회원탈퇴');
        } catch (err) {
            throw new Error(err);
        }
    }

}

module.exports = userApi;