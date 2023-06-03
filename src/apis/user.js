const { User }  = require('../models/schemas/user');
// const bodyParser = require('body-parser');
// app.use(express.urlencoded({extended: true}));

const userApi = {

    /** userApi 테스트 */
    async userTest(req, res) {
        try {
            //userApi 테스트
            res.send('userApi GET 방식 테스트');
            console.log('userApi 테스트1');        
        } catch (error) {
            throw new Error(err);
        }
    },

    /** userApi post 방식 테스트 */
    async postUserTest(req, res) {
        try {
            const { title } = req.body;

            res.send(req.body);
            // res.json({
            //     message: "post 방식 성공",
            //     data: req.body.title
            // })
            
        } catch (error) {
            throw new Error(err);
        }
    },

    /** 회원가입 */
    async registerUser(req, res, next) {
        try {
            //회원가입
            res.send('회원가입');
        } catch (error) {
            console.log(error);
            throw new Error(err);
        }
    },

    /** 로그인 */
    async loginUser(req, res, next) {
        try {

            res.send('로그인');
        } catch (error) {
            throw new Error(err);
        }
    },

    /** 내 정보 조회 */
    async getUserInfo(req, res) {
        try {

            res.send('내 정보 조회');
        } catch (error) {
            throw new Error(err);
        }
    },


    /** 내 정보 수정 */
    async modifyUserInfo(req, res, next) {
        try {

            res.send('내 정보 수정');
        } catch (error) {
            throw new Error(err);
        }
    },


    /** 회원탈퇴 */
    async deleteUser(req, res, next) {
        try {

            res.send('회원탈퇴');
        } catch (error) {
            throw new Error(err);
        }
    }

}

module.exports = userApi;