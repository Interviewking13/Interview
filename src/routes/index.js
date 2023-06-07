const express = require('express');
const router = express.Router();
const path = require('path');
const cors = require('cors');

const userRouter = require('./user');
const communityRouter = require('./community');
const studyRouter = require('./study');
const studyFeedbackRouter = require('./study_feedback');
const indexPath = path.join(__dirname, '../views');

// router.use(cors({
//     origin: "http://localhost:3000",
//     credentials: "true",
//     optionsSuccessStatus: 200,
//     exposedHeaders: ['Access-Control-Allow-Origin'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// }));

router.use(express.json());
router.use(express.static(indexPath));
router.use('/api/user', userRouter);
router.use('/api/community', communityRouter);
router.use('/api/study', studyRouter);
router.use('/api/feedback', studyFeedbackRouter);

module.exports = router;
