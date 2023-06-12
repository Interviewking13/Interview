const { Router } = require('express');
const router = Router();
const tokenValidate = require('../middlewares/tokenValidate');

const studyFeedbackApi = require('../apis/study_feedback');

router.post('/create', tokenValidate, studyFeedbackApi.newFeedback); // 피드백 게시글, 댓글 작성
router.get('/:study_id', studyFeedbackApi.studyFeedback); // 피드백 게시글, 댓글 조회(스터디별)
router.get('/', studyFeedbackApi.userFeedback); // 피드백 게시글, 댓글 조회(유저별)
router.put('/', tokenValidate, studyFeedbackApi.updateFeedback); // 피드백 게시글, 댓글 수정
router.delete('/:study_id', tokenValidate, studyFeedbackApi.deleteFeedback); // 피드백 게시글, 댓글 삭제

module.exports = router;
