require("dotenv").config({ path: "../../env" });

const { Router } = require('express');
const router = Router();
const fs = require('fs');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const { Readable } = require('stream');
const moment = require('moment');
const { Community } = require('../models');

/** S3 연결 */
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRET,
  },
  endpoint: 'https://s3.ap-northeast-2.amazonaws.com'
});

/** 파일 업로드 */
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage }).single('file');

router.post('/', async (req, res) => {
  try {
    // 파일 업로드 처리
    uploadMiddleware(req, res, async (err) => {
      if (err) {
        console.log(err);
        res.status(400).json({ message: '파일업로드 실패' });
        return;
      }

      const fileStream = Readable.from(req.file.buffer);
      const datetime = moment().format('YYYYMMDDHHmmss');
      const key = `${req.body.dir}/${datetime}_${req.file.originalname}`;

      const params = {
        Bucket: '13team',
        Key: key,
        Body: fileStream,
        ContentLength: req.file.size,
      };

      const command = new PutObjectCommand(params);
      const response = await s3.send(command);
      console.log('upload router response: ', response);

      res.status(200).json({ message: '파일업로드 성공', data: response });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: '파일업로드 실패' });
  }
});

/** 파일 다운로드 API */
router.get('/:fileId', async (req, res) => {
  try {
    const fileId = req.params.fileId;

    // 파일의 S3 키를 생성하거나 가져옴
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
  } catch (error) {
    console.error('파일 다운로드 실패:', error);
    res.status(500).json({ message: '파일 다운로드 실패' });
  }
});

module.exports = router;
