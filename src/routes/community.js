const { Router } = require('express');
const router = Router();
const communityApi = require("../apis/community");
const fileUpload = require("../middlewares/fileUpload");
const fileDownload = require("../middlewares/fileDownload");
const fileModify = require("../middlewares/fileModify");
const userTokenValidate = require("../middlewares/userTokenValidate");

router.get("/list", communityApi.getAllList);
router.post("/detl", fileUpload, communityApi.postContent); //fileUpload
router.get("/detl", communityApi.getContent);
router.put("/detl", userTokenValidate, fileModify, communityApi.modifyContent); //fileModify
router.delete("/detl", userTokenValidate, communityApi.deleteContent);
router.post("/reply", communityApi.postReply);
router.put("/reply", userTokenValidate, communityApi.modifyReply);
router.delete("/reply", userTokenValidate, communityApi.deleteReply);
router.get("/detl/download", fileDownload, communityApi.fileDownload); //fileDownload

module.exports = router;
