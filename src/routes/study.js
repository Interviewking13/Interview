const { Router } = require('express');
const router = Router();
const studyApi = require('../apis/study');
const userTokenValidate = require('../middlewares/userTokenValidate');

const studyController = require('../controllers/studyController');

// router.post('/create', userTokenValidate, studyApi.newStudy); // 스터디 개설
// router.post('/apply', userTokenValidate, studyApi.applyStudy); // 스터디 신청
// router.put('/accept/:study_id/:member_id', userTokenValidate, studyApi.acceptStudy); // 스터디 신청 수락
// router.get('/accept/:study_id/:accept', studyApi.acceptRelation); // 스터디 신청 or 수락 명단 조회
// router.get('/info', studyApi.getStudy); // 스터디 정보 조회(전체)
// router.get('/info/:study_id', studyApi.getStudyOne); // 스터디 정보 조회(스터디별)
// router.put('/info/:study_id', userTokenValidate, studyApi.updateStudy); // 스터디 정보 수정(장)
// router.delete('/', userTokenValidate, studyApi.leaveUser); // 스터디 탈퇴
// router.delete('/:study_id/:member_id', userTokenValidate, studyApi.deleteUser); // 스터디 회원 관리(장)
// router.delete('/:study_id', userTokenValidate, studyApi.deleteStudy); // 스터디 정보 삭제(장)

// 계층구조 분리
router.get('/studyInfo/:study_id', studyController.getStudyInfoById);

/**
 * @swagger
 * tags:
 *   name: study-controller
 *   description: Study API
 */

/**
 * @swagger
 * /api/study/studyInfo/:study_id:
 *   post:
 *     summary: 스터디 ID 찾기
 *     tags: [study-controller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               study_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: 스터디 ID 조회 성공
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
 *                     study_id:
 *                       type: string
 *                     leader_id:
 *                       type: string
 *                     study_name:
 *                       type: string
 *                     leader_name:
 *                       type: string
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     start:
 *                       type: Date
 *                     end:
 *                       type: Date
 *                     deadline:
 *                       type: Date
 *                     headcount:
 *                       type: number
 *                     acceptcount:
 *                       type: number
 *                     chat_link:
 *                       type: string
 *                     status:
 *                       type: number
 * 
 *       404:
 *         description: 해당 스터디를 찾을 수 없습니다.
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
