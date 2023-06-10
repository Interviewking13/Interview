const { Router } = require('express');
const router = Router();

const multer = require('multer');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { Readable } = require('stream');
const moment = require('moment');
const s3 = require('../config/s3');

/** 파일 업로드 */
async function fileUpload(req, res, next) {
    try {

        /** 서버로 업로드 */
        const storage = multer.memoryStorage();
        const uploadMiddleware = multer({ storage }).single('file');

        /** 서버에서 S3로 업로드 */
        uploadMiddleware(req, res, async (err) => {
            if (err) {
                console.log(err);
                res.status(400).json({ message: '파일업로드 실패' });
                return;
            }

            /** 첨부파일이 없는 경우 */
            if (!req.file) {
                next();
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
      
            if(response){
                req.ETag = response.ETag;
                req.fileName = req.file.originalname;
                req.fileKey = key; 
                next();
            } else {
                res.end();
            }
        });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: '파일업로드 실패' });
    }
}

module.exports = fileUpload;
