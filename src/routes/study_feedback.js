const { Router } = require('express');
const router = Router();

const studyFeedbackApi = require('../apis/study_feedback');

router.post('/create', studyFeedbackApi.newFeedback); // 피드백 게시글, 댓글 작성
router.get('/:study_id/:user_id', studyFeedbackApi.getFeedback); // 피드백 게시글, 댓글 조회
router.put('/:study_id/:user_id', studyFeedbackApi.updateFeedback); // 피드백 게시글, 댓글 수정
router.delete('/:study_id/:user_id', studyFeedbackApi.deleteFeedback); // 피드백 게시글, 댓글 삭제

module.exports = router;
