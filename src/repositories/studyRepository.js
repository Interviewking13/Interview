const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { Study } = require('../models/index');
const ObjectId = mongoose.Types.ObjectId;

const studyRepository = {

    async findStudyAll() {
        try {
            const findStudy = await Study.find();
            return findStudy;
        } catch (err) {
            console.error(err);
            throw new Error('Invalid Error');
        }
    },

    async findStudyById(study_id) {
        try {
            const findStudy = await Study.findOne({
                "_id": study_id
            });
            if (!findStudy) {
                return {
                    resultCode: "404",
                    message: "해당 스터디가 존재하지 않습니다."
                }
            }
            return ({
                resultCode: "200",
                message: "스터디 조회 성공",
                data : {
                    study_id: findStudy._id, 
                    leader_id: findStudy.leader_id, 
                    study_name: findStudy.study_name, 
                    leader_name: findStudy.leader_name, 
                    title: findStudy.title, 
                    content: findStudy.content, 
                    start: findStudy.start, 
                    end: findStudy.end, 
                    deadline: findStudy.deadline, 
                    headcount: findStudy.headcount, 
                    acceptcount: findStudy.acceptcount, 
                    chat_link: findStudy.chat_link, 
                    status: findStudy.status, 
                }
            });
        } catch (err) {
            console.error(err);
            throw new Error('Invalid Error');
        }
    }

}

module.exports = studyRepository;