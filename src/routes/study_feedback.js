const { Router } = require('express');
const router = Router();

const studyFeedbackApi = require('../apis/study_feedback');

router.post('/create', studyFeedbackApi.newFeedback); // 스터디 개설
router.get('/', studyFeedbackApi.getStudyFeedback); // 스터디 정보 조회
router.put('/', studyFeedbackApi.updateStudyFeedback); // 스터디 정보 수정(장)
router.delete('/', studyFeedbackApi.deleteStudyFeedback); // 스터디 정보 삭제(장)

module.exports = router;
