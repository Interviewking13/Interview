const express = require("express");
const router = express.Router();
const path = require("path");

const userRouter = require('./user');
const communityRouter = require('./community');
const indexPath = path.join(__dirname, "../views");

router.use(express.json());
router.use(express.static(indexPath));
router.use('/api/user', userRouter);
router.use('/api/community', communityRouter);

module.exports = router;
