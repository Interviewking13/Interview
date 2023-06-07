const { Router } = require('express');
const router = Router();

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const { Readable } = require('stream');
const moment = require('moment');

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const upload = async (stream, filename, dir) => {
  const datetime = moment().format('YYYYMMDDHHmmss');
  const key = `${dir}/${datetime}_${filename}`;

  const params = {
    Bucket: '13team',
    Key: key,
    Body: stream,
    ACL: 'public-read-write',
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

/** 파일 업로드 */
router.post('/', uploadMiddleware, async (req, res) => {
  try {
    const file = req.file;
    const fileStream = Readable.from(file.buffer); // 버퍼에서 Readable 스트림 생성
    const uploadedKey = await upload(fileStream, file.originalname, req.body.dir);

    console.log('upload router');
    console.log(file);
    console.log(uploadedKey);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: '파일업로드 실패' });
  }
});

module.exports = router;
