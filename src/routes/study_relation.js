const { Router } = require('express');
const router = Router();

const studyRelationApi = require('../apis/study_relation');

router.post('/create', studyRelationApi.newLeader); // ���͵��� ���� ���

module.exports = router;
