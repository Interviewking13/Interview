const { Router } = require('express');
const router = Router();

const studyApi = require('../apis/study');

router.post('/create', studyApi.newStudy); // ���͵� ����
router.post('/apply', studyApi.applyStudy); // ���͵� ��û
router.get('/info', studyApi.getStudy); // ���͵� ���� ��ȸ
router.put('/info', studyApi.updateStudy); // ���͵� ���� ����(��)
router.delete('/info', studyApi.deleteStudy); // ���͵� ���� ����(��)

module.exports = router;
