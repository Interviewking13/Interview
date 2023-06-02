const { Router } = require('express');
const router = Router();

const studyFeedbackApi = require('../apis/study_feedback');

router.post('/create', studyFeedbackApi.newFeedback); // ���͵� ����
router.get('/', studyFeedbackApi.getStudyFeedback); // ���͵� ���� ��ȸ
router.put('/', studyFeedbackApi.updateStudyFeedback); // ���͵� ���� ����(��)
router.delete('/', studyFeedbackApi.deleteStudyFeedback); // ���͵� ���� ����(��)

module.exports = router;
