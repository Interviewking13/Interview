const express = require('express');
const router = express.Router();
const path = require('path');
const cors = require('cors');

const userRouter = require('./user');
const communityRouter = require('./community');
const indexPath = path.join(__dirname, '../pages');
const studyRouter = require('./study');
const studyFeedbackRouter = require('./study_feedback');
const googleRouter = require('./auth_google');
const naverRouter = require('./auth_naver');
const kakaoRouter = require('./auth_kakao');

router.use(cors());

router.use(express.json());
router.use(express.static(indexPath));
router.use('/api/user', userRouter);
router.use('/api/community', communityRouter);
router.use('/api/study', studyRouter);
router.use('/api/feedback', studyFeedbackRouter);
router.use('/api/auth/google', googleRouter);
router.use('/api/auth/naver', naverRouter);
router.use('/api/auth/kakao', kakaoRouter);

module.exports = router;
