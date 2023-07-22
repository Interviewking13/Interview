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
            // return findStudy;
            
            if (!findStudy) {
                return {
                    resultCode: "404",
                    message: "해당 스터디가 존재하지 않습니다."
                }
            }
            return ({
                status: "200",
                message: "스터디 조회 성공",
                data : {
                    study_id: findStudy.study_id, 
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
    },

}

module.exports = studyService;