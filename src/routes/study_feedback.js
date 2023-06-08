const { Router } = require('express');
const router = Router();
const tokenValidate = require('../middlewares/tokenValidate');

const studyFeedbackApi = require('../apis/study_feedback');

router.post('/create', tokenValidate, studyFeedbackApi.newFeedback); // 피드백 게시글, 댓글 작성
router.get('/:content_type', studyFeedbackApi.getFeedback); // 피드백 게시글, 댓글 조회(전체)
router.get('/', tokenValidate, studyFeedbackApi.getFeedbackOne); // 피드백 게시글, 댓글 조회(개별)
router.put('/', tokenValidate, studyFeedbackApi.updateFeedback); // 피드백 게시글, 댓글 수정
router.delete('/', tokenValidate, studyFeedbackApi.deleteFeedback); // 피드백 게시글, 댓글 삭제

module.exports = router;
