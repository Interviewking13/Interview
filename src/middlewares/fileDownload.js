require("dotenv").config({ path: "../../env" });

const { Router } = require('express');
const router = Router();

/** 파일 다운로드 */
async function fileDownload(req, res, next) {
    try {
      const fileId = req.params.fileId;
  
      // 파일의 S3 키를 생성하거나 가져옴
      const etag = await Community.find({ attach : fileId });
      const key = `${req.body.dir}/${datetime}_${req.file.originalname}`;
  
      // S3에서 파일 가져오기
      const params = {
        Bucket: '13team',
        Key: key,
      };
      const command = new GetObjectCommand(params);
      const response = await s3.send(command);
      
      // 클라이언트에게 파일 전달
      const fileStream = response.Body;
      const contentType = response.ContentType;
      const contentDisposition = `attachment; filename=${response.Metadata.filename}`;
      
      res.set('Content-Type', contentType);
      res.set('Content-Disposition', contentDisposition);
      
      fileStream.pipe(res);
      next();
    } catch (error) {
      console.error('파일 다운로드 실패:', error);
      res.status(500).json({ message: '파일 다운로드 실패' });
    }
  };
  
  module.exports = fileDownload;
  