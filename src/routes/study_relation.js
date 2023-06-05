const { Router } = require('express');
const router = Router();

const studyRelationApi = require('../apis/study_relation');

router.post('/create', studyRelationApi.newLeader); // 스터디장 권한 등록

module.exports = router;
