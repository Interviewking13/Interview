const { Router } = require('express');
const router = Router();

const studyApi = require('../apis/study');

router.post('/create', studyApi.newStudy); // 스터디 개설
router.post('/apply', studyApi.applyStudy); // 스터디 신청
router.get('/info', studyApi.getStudy); // 스터디 정보 조회
router.put('/info', studyApi.updateStudy); // 스터디 정보 수정(장)
router.delete('/info', studyApi.deleteStudy); // 스터디 정보 삭제(장)

module.exports = router;
