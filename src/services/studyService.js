const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const secretKey = process.env.SECRET_KEY;

const studyRepository = require('../repositories/studyRepository');

const studyService = {

    /** 스터디 정보 조회 -  todo: 페이지네이션, 숫자는 변수값에 맞춰서 구현 */
    // async findStudyAll() {

    // },

    async findStudyById(study_id) {
        try {
            const findStudy = await studyRepository.findStudyById(study_id);
            console.log(findStudy);
            return findStudy;
        } catch (err) {
            console.error(err);
            throw new Error('Invalid Error');
        }
    },

}

module.exports = studyService;