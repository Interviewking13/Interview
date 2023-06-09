const { Router } = require('express');
const router = Router();
const communityApi = require("../apis/community");
const fileUpload = require("../middlewares/fileUpload");
const fileDownload = require("../middlewares/fileDownload");

router.get("/list", communityApi.getAllList);
router.post("/detl", fileUpload, communityApi.postContent);
router.get("/detl", fileDownload, communityApi.getContent);
router.put("/detl", communityApi.modifyContent);
router.delete("/detl", communityApi.deleteContent);
router.post("/reply", communityApi.postReply);
router.put("/reply", communityApi.modifyReply);
router.delete("/reply", communityApi.deleteReply);

module.exports = router;