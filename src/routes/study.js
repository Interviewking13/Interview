const { Router } = require('express');
const router = Router();
const studyApi = require('../apis/study');
const tokenValidate = require('../middlewares/tokenValidate');

router.post('/create', tokenValidate, studyApi.newStudy); // 스터디 개설
router.post('/apply', tokenValidate, studyApi.applyStudy); // 스터디 신청
router.put('/accept/:study_id', tokenValidate, studyApi.acceptStudy); // 스터디 신청 수락
router.get('/info', studyApi.getStudy); // 스터디 정보 조회(전체)
router.get('/info/:study_id', studyApi.getStudyOne); // 스터디 정보 조회(개별)
router.put('/info/:study_id', tokenValidate, studyApi.updateStudy); // 스터디 정보 수정(장)
router.delete('/:member_id', tokenValidate, studyApi.deleteUser); // 스터디 회원 관리(장)
router.delete('/info/:study_id', tokenValidate, studyApi.deleteStudy); // 스터디 정보 삭제(장)

module.exports = router;
