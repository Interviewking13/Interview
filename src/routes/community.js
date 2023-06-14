const { Router } = require('express');
const router = Router();
const communityApi = require("../apis/community");
const fileUpload = require("../middlewares/fileUpload");
const fileDownload = require("../middlewares/fileDownload");
const fileModify = require("../middlewares/fileModify");
const userTokenValidate = require("../middlewares/userTokenValidate");

router.get("/list", communityApi.getAllList);
router.post("/detl", communityApi.postContent); //fileUpload
router.get("/detl", communityApi.getContent);
router.put("/detl", communityApi.modifyContent); //fileModify
router.delete("/detl", communityApi.deleteContent);
//router.get("/download", communityApi.fileDownload); //fileDownload
router.post("/reply", communityApi.postReply);
router.put("/reply", communityApi.modifyReply);
router.delete("/reply", communityApi.deleteReply);

module.exports = router;
