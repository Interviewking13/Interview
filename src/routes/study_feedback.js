const { Router } = require('express');
const router = Router();

const studyFeedbackApi = require('../apis/study_feedback');

router.post('/create', studyFeedbackApi.newFeedback); // ���͵� ����
// router.post('/apply', studyApi.applyStudy); // ���͵� ��û
// router.get('/info', studyApi.getStudy); // ���͵� ���� ��ȸ
// router.put('/info', studyApi.updateStudy); // ���͵� ���� ����(��)
// router.delete('/info', studyApi.deleteStudy); // ���͵� ���� ����(��)

module.exports = router;
