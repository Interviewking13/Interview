require("dotenv").config({ path: "../../env" });

const { Router } = require('express');
const router = Router();

const { S3Client } = require('@aws-sdk/client-s3');

/** S3 연결 */
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS,
      secretAccessKey: process.env.AWS_SECRET,
    },
    // endpoint: 'https://s3.ap-northeast-2.amazonaws.com'
    endpoint : 'https://s3.ap-northeast-2.amazonaws.com'
  });
  
module.exports = s3;
  
