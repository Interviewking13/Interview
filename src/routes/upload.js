require("dotenv").config({ path: "../../env" });

const { Router } = require('express');
const router = Router();

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const { Readable } = require('stream');
const moment = require('moment');

/** S3연결 */
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRET,
  },
  endpoint: 'https://s3.ap-northeast-2.amazonaws.com/13team/community/',
});

/** 파일 업로드 */
const upload = async (stream, filename, dir) => {
  const datetime = moment().format('YYYYMMDDHHmmss');
  const key = `${dir}/${datetime}_${filename}`;

  const params = {
    Bucket: '13team',
    Key: key,
    Body: stream,
    ACL: 'public-read-write',
    ContentEncoding: 'base64',
  };

  const command = new PutObjectCommand(params);

  try {
    await s3Client.send(command);
    return key;
  } catch (error) {
    console.log(error);
    throw new Error('파일업로드 실패');
  }
};

const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage }).single('file');
console.log('uploadMiddleware: ', uploadMiddleware);

router.post('/', uploadMiddleware, async (req, res) => {
  try {

    const file = req.file;
    const fileData = file.buffer || file.data; // 버퍼 데이터 또는 일반 데이터 선택
    const fileStream = Readable.from(fileData); // 데이터에서 Readable 스트림 생성
    const uploadedKey = await upload(fileStream, file.originalname, req.body.dir);

    console.log('upload router: ', file);

    res.status(200).json({ message: '파일업로드 성공' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: '파일업로드 실패' });
  }
});

module.exports = router;
