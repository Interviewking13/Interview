const express = require('express');
const router = express.Router();

// middleware
const userTokenValidate = require("../middlewares/userTokenValidate");
const isLoginValidate = require("../middlewares/isLoginValidate");

// user API - Hierarchical Separation
const userController = require("../controllers/userController");

router.get('/login', isLoginValidate);                      // 로그인 유효성 검사
router.get('/userTokenValidate', userTokenValidate);        // 토큰 유효성 검사

/**
 * @swagger
 * tags:
 *   name: middleware
 *   description: Middleware related to User API
 */
/**
 * @swagger
 * /api/user/login:
 *   get:
 *     summary: 로그인 유효성 검사
 *     tags:
 *       - middleware
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer [token]
 *     responses:
 *       200:
 *         description: 로그인 상태
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   properties:
 *                     user_id:
 *                       type: string
 *       401:
 *         description: Unauthorized token / 로그아웃 상태
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 *       403:
 *         description: Invalid token / 로그아웃 상태
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 *       404:
 *         description: Expired token / 로그아웃 상태
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Invalid Error / 로그아웃 상태
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * tags:
 *   name: middleware
 *   description: Middleware related to User API
 */

/**
 * @swagger
 * /api/user/userTokenValidate:
 *   get:
 *     summary: 토큰 유효성 검사
 *     tags:
 *       - middleware
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer [token]
 *     responses:
 *       200:
 *         description: 유효한 토큰
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   properties:
 *                     user_id:
 *                       type: string
 *       401:
 *         description: Unauthorized token / 권한이 없습니다.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 *       403:
 *         description: Invalid token / 유효하지 않은 토큰입니다.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 *       404:
 *         description: Expired token / 만료된 토큰입니다.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Invalid error
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 */

router.post('/signup', userController.postSignUp);                              // 회원가입
router.post('/signin', userController.postSignIn);                              // 로그인
router.get('/mypage', userTokenValidate, userController.getUserInfoByHeader);   // 내 정보 조회
router.put('/mypage', userTokenValidate, userController.postUserInfo);          // 내 정보 수정
router.delete('/mypage', userTokenValidate, userController.deleteUserInfo);     // 회원탈퇴
router.post('/logout', userTokenValidate, userController.logoutUser);           // 로그아웃

/**
 * @swagger
 * tags:
 *   name: user-controller
 *   description: User API
 */

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: 회원가입
 *     tags: [user-controller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               user_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               passwordCheck:
 *                 type: string
 *               phone_number:
 *                 type: string
 *     responses:
 *       200:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   properties:
 *                     user_id:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: 잘못된 요청(입력값) 또는 기존에 가입되어 있는 회원입니다.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   properties:
 *                     user_id:
 *                       type: string
 *                     email:
 *                       type: string
 *       500:
 *         description: Invalid Error
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /api/user/signin:
 *   post:
 *     summary: 로그인
 *     tags: [user-controller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         headers:
 *           Authorization:
 *             description: 현재 사용자의 Access token
 *             schema:
 *               type: string
 *               format: Bearer [token]
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   properties:
 *                     user_id:
 *                       type: string
 *                     user_name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     token:
 *                       type: string
 *       400:
 *         description: 올바른 이메일 형식이 아닙니다.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 *       404:
 *         description: 이메일을 조회할 수 없습니다.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Invalid Error
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /api/user/mypage:
 *   get:
 *     summary: 내 정보 조회
 *     tags: [user-controller]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer [token]
 *     responses:
 *       200:
 *         description: 내 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   properties:
 *                     user_id:
 *                       type: string
 *                     user_name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     intro_yn:
 *                       type: string
 *                     phone_number:
 *                       type: string
 *                     file_key:
 *                       type: string
 *                     file_name:
 *                       type: string
 *       404:
 *         description: 해당 사용자를 찾을 수 없습니다.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Invalid Error
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /api/user/mypage:
 *   put:
 *     summary: 내 정보 수정
 *     tags: [user-controller]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer [token]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               user_id:
 *                 type: string
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *               passwordCheck:
 *                 type: string
 *               intro_yn:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               file_key:
 *                 type: string
 *               file_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: 내 정보 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   properties:
 *                     user_id:
 *                       type: string
 *                     user_name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     intro_yn:
 *                       type: string
 *                     phone_number:
 *                       type: string
 *                     file_key:
 *                       type: string
 *                     file_name:
 *                       type: string
 *       404:
 *         description: 내 정보를 조회할 수 없습니다.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Invalid Error
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 */


/**
 * @swagger
 * /api/user/mypage:
 *   delete:
 *     summary: 회원탈퇴
 *     tags: [user-controller]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer [token]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               user_id:
 *                 type: string
 *               token:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 내 정보 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   properties:
 *                     user_id:
 *                       type: string
 *                     user_name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     intro_yn:
 *                       type: string
 *                     phone_number:
 *                       type: string
 *                     file_key:
 *                       type: string
 *                     file_name:
 *                       type: string
 *       404:
 *         description: 내 정보를 조회할 수 없습니다.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Invalid Error
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /api/user/mypage:
 *   post:
 *     summary: 로그아웃
 *     tags: [user-controller]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer [token]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               user_id:
 *                 type: string
 *               token:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 로그아웃 성공
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 *       404:
 *         description: 사용자 정보를 찾을 수 없습니다.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Invalid Error
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 */

router.get('/userInfo/:user_id', userTokenValidate, userController.getUserInfoById);    // user ID 로 사용자 정보 조회

/**
 * @swagger
 * tags:
 *   name: user-controller-supporting User API
 *   description: Supporting User API
 */

/**
 * @swagger
 * /api/user/userInfo/:user_id:
 *   post:
 *     summary: user ID 로 사용자 정보 조회
 *     tags: [user-controller-supporting User API]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer [token]
 *       - in: path
 *         name: user_id
 *         description: 조회할 사용자의 ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               user_id:
 *                 type: string
 *               token:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 사용자 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   properties:
 *                     user_id:
 *                       type: string
 *                     user_name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     intro_yn:
 *                       type: string
 *                     phone_number:
 *                       type: string
 *                     file_key:
 *                       type: string
 *                     file_name:
 *                       type: string
 *       404:
 *         description: 해당 사용자를 찾을 수 없습니다.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Invalid Error
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 resultCode:
 *                   type: string
 *                 message:
 *                   type: string
 */


module.exports = router;