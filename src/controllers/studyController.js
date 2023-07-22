const express = require('express');
const app = express();

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const studyService = require('../services/studyService');

const studyController = {

    /** 스터디 ID 정보 조회 */
    async getStudyInfoById(req, res, next) {
        try {
            const { study_id } = req.params;
            console.log(study_id);
            const findStudy = await studyService.findStudyById(study_id);
            if (!findStudy) {
                return res.status(404).json({
                    resultCode: "404",
                    message: "해당 스터디가 존재하지 않습니다."
                });
            }
            return res.status(200).json(findStudy);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                resultCode: "500",
                message: "Invalid Error"
            });
        }
    }
}

module.exports = studyController;
