const { Router } = require('express');
const router = Router();
const communityApi = require("../apis/community");

router.get("/list", communityApi.getAllList);
router.post("/detl", communityApi.postContent);
router.get("/detl", communityApi.getContent);
router.put("/detl", communityApi.modifyContent);
router.delete("/detl", communityApi.deleteContent);
router.post("/reply", communityApi.postReply);
router.put("/reply", communityApi.modifyReply);
router.delete("/reply", communityApi.deleteReply);

module.exports = router;