const { Router } = require('express');
const router = Router();

const AWS = require('aws-sdk');
const AWS_ACCESS = process.env.AWS_ACCESS;
const AWS_SECRET = process.env.AWS_SECRET;
const AWS_REGION = process.env.AWS_REGION;

const multer = require('multer');
const multerS3 = require('multer-s3');
const moment = require('moment');

const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS,
    secretAccessKey: AWS_SECRET,
    region: AWS_REGION
})

const storage = multerS3({
    s3: s3,
    acl: 'public-read-write',
    bucket: "13team",
    key: (req, file, callback) => {
    	let dir = req.body.dir;
        let datetime = moment().format('YYYYMMDDHHmmss');
        callback(null, dir + datetime + "_" + file.originalname);  // 저장되는 파일명
    }
});

const upload = multer({ storage: storage });

/** 파일업로드 */
router.post('/upload', upload.single('file'), async (req, res) => {
    try {

        let saveFile = req.file;
        let params = [saveFile.originalname, saveFile.key, saveFile.location, saveFile.contentType];

        console.log(saveFile);
        console.log(params);

    } catch {
        console.log(err);
        throw new Error(err);
    }
});

module.exports = router;