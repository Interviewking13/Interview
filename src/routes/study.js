const { Router } = require('express');
const router = Router();
const studyApi = require('../apis/study');


router.post('/create', studyApi.newStudy); // 스터디 개설
router.post('/apply', studyApi.applyStudy); // 스터디 신청
router.post('/accept', studyApi.acceptStudy); // 스터디 신청 수락
router.get('/info/:study_id', studyApi.getStudy); // 스터디 정보 조회
router.put('/info', studyApi.updateStudy); // 스터디 정보 수정(장)
router.delete('/info', studyApi.deleteStudy); // 스터디 정보 삭제(장)

module.exports = router;
