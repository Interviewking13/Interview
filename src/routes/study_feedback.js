const { Router } = require('express');
const router = Router();

const studyFeedbackApi = require('../apis/study_feedback');

router.post('/create', studyFeedbackApi.newFeedback); // 스터디 개설
// router.post('/apply', studyApi.applyStudy); // 스터디 신청
// router.get('/info', studyApi.getStudy); // 스터디 정보 조회
// router.put('/info', studyApi.updateStudy); // 스터디 정보 수정(장)
// router.delete('/info', studyApi.deleteStudy); // 스터디 정보 삭제(장)

module.exports = router;
