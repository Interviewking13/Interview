const { Router } = require('express');
const router = Router();
const communityApi = require("../apis/community");
const fileUpload = require("../middlewares/fileUpload");
const fileDownload = require("../middlewares/fileDownload");
const fileModify = require("../middlewares/fileModify");

router.get("/list", communityApi.getAllList);
router.post("/detl", fileUpload, communityApi.postContent);
router.get("/detl", communityApi.getContent);
router.put("/detl", fileModify, communityApi.modifyContent);
router.delete("/detl", communityApi.deleteContent);
router.get("/download", fileDownload, communityApi.fileDownload);
router.post("/reply", communityApi.postReply);
router.put("/reply", communityApi.modifyReply);
router.delete("/reply", communityApi.deleteReply);

module.exports = router;