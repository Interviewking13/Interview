const express = require('express');
const router = express.Router();
const path = require('path');
const cors = require('cors');

const userRouter = require('./user');
const communityRouter = require('./community');
const indexPath = path.join(__dirname, "../pages");
const studyRouter = require('./study');
const studyFeedbackRouter = require('./study_feedback');

router.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,                                    // 토큰 에러 테스트
    optionsSuccessStatus: 200,
    exposedHeaders: ['Access-Control-Allow-Origin'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],    // 토큰 에러 테스트
  }),
);

// JWT 토큰 - 쿠키값 테스트
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});

router.use(express.json());
router.use(express.static(indexPath));
router.use('/api/user', userRouter);
router.use('/api/community', communityRouter);
router.use('/api/study', studyRouter);
router.use('/api/feedback', studyFeedbackRouter);

module.exports = router;
