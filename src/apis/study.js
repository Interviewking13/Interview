const { Study } = require('../models/index');
const { User } = require('../models/index');
const { StudyRelation } = require('../models/index');
// const mongoose = require('mongoose');
// const { ObjectId } = require('mongodb');

const studyApi = {
  /**스터디 개설*/
  async newStudy(req, res, next) {
    try {
      // 스터디 개설
      const user_id = req.user._id;
      const { study_name, title, content, deadline, headcount, chat_link, status } = req.body;

      const createInfo = {
        study_name,
        title,
        content,
        deadline,
        headcount,
        chat_link,
        status,
      };

      const createdStudy = await Study.create(createInfo);
      res.study = createdStudy;
      res.status(200).json(createdStudy);

      // 스터디 관계 생성
      const study_id = createdStudy._id;
      console.log(study_id);

      const createRelation = {
        user_id,
        study_id,
        is_leader: 1,
      };

      const createdRelation = await StudyRelation.create(createRelation);
      res.study_relation = createdRelation;
    } catch (error) {
      console.log(error.message);
      res.status(400).json({
        code: 400,
        message: 'wrong request',
      });
    }
  },

  /**스터디 신청*/
  async applyStudy(req, res, next) {
    try {
      const user_id = req.user._id;
      const { study_id, goal } = req.body;
      const createInfo = {
        user_id,
        study_id,
        is_leader: 0,
        goal,
        accept: 0,
      };
      const applyedStudy = await StudyRelation.create(createInfo);
      res.study_relation = applyedStudy;
      res.status(200).json(applyedStudy);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        code: 400,
        message: 'wrong request',
      });
    }
  },

  /**스터디 신청 수락*/
  async acceptStudy(req, res, next) {
    try {
      // 스터디장 권한 판단
      const { user_id, study_id } = req.params;
      // const member = StudyRelation.findOne({ user_id: member_id });
      // if (!member || member.is_leader === 0)
      //   throw new Error('You do not have authorization to accept study applications.');

      // 스터디원 권한 판단
      // const leader_id = req.user._id;
      // const leader = StudyRelation.findOne({ user_id: leader_id });
      // if (!leader || leader.is_leader === 1) throw new Error('Only leader can accept');

      // const foundRelation = await StudyRelation.findOne({ study_id, user_id });
      // if (!foundRelation) {
      //   throw new Error('Relation not found');
      // }

      const { accept } = req.body;
      const updateInfo = { accept };
      const updatedStudy = await StudyRelation.updateOne({ user_id, study_id }, updateInfo);
      console.log(updateInfo);
      res.status(200).json(updatedStudy);
    } catch (error) {
      res.status(422).json({
        code: 422,
        message: 'Not authorization',
      });
    }
  },

  /**스터디 정보 조회(전체)*/
  async getStudy(req, res, next) {
    try {
      const foundStudy = await Study.find({});
      if (!foundStudy) return console.error(error);
      res.status(200).json(foundStudy);
    } catch (error) {
      console.log(error);
      res.status(426).json({
        code: 426,
        message: 'wrong request',
      });
    }
  },

  /**스터디 정보 조회(개별)*/
  async getStudyOne(req, res, next) {
    try {
      const { study_id } = req.params;
      const foundStudy = await Study.findOne({ _id: study_id });
      if (!foundStudy) throw new Error('Not found');
      res.status(200).json(foundStudy);
    } catch (error) {
      console.log(error);
      res.status(426).json({
        code: 426,
        message: 'study_id',
      });
    }
  },

  /**스터디 정보 수정*/
  async updateStudy(req, res, next) {
    try {
      // 스터디장 권한 판단
      const leader_id = req.user._id;
      const foundRelation = await StudyRelation.findOne({ user_id: leader_id });
      if (!foundRelation) throw new Error('Not found');
      if (foundRelation.is_leader != 1) throw new Error('Not authorization');

      // 스터디 정보 수정
      const { study_id } = req.params;
      const { study_name, title, content, deadline, headcount, chat_link, status } = req.body;
      const updateInfo = {
        study_name,
        title,
        content,
        deadline,
        headcount,
        chat_link,
        status,
      };
      const updatedStudy = await Study.updateOne({ _id: study_id }, updateInfo);
      res.status(200).json(updatedStudy);
    } catch (error) {
      console.log(error);
      res.status(426).json({
        code: 426,
        message: 'wrong request',
      });
    }
  },

  /**스터디 회원 관리*/
  async deleteUser(req, res, next) {
    try {
      // 스터디장 권한 판단
      const leader_id = req.user._id;
      const foundRelation = await StudyRelation.findOne({ user_id: leader_id });
      if (!foundRelation) throw new Error('Not found');
      if (foundRelation.is_leader != 1) throw new Error('Not authorization');

      // 스터디 회원 관리
      const member_id = req.params;
      const deletedRelation = await StudyRelation.deleteOne({ user_id: member_id }); // 특정 유저 스터디에서 삭제
      res.study_relation = deletedRelation;
      res.status(200).json(deletedRelation);

      const deletedFeedback = await StudyFeedback.deleteOne({ user_id: member_id }); // 특정 유저가 쓴 피드백을 삭제
      res.study_feedback = deletedFeedback;
    } catch (error) {
      console.log(error);
      res.status(426).json({
        code: 426,
        message: 'cannot delete study',
      });
    }
  },

  /**스터디 삭제*/
  async deleteStudy(req, res, next) {
    try {
      // 스터디장 권한 판단
      const leader_id = req.user._id;
      const foundRelation = await StudyRelation.findOne({ user_id: leader_id });
      if (!foundRelation) throw new Error('Not found');
      if (foundRelation.is_leader != 1) throw new Error('Not authorization');

      // 스터디 삭제
      const { study_id } = req.params;
      const foundStudy = await Study.findOne({ _id: study_id });
      if (!foundStudy) throw new Error('Not found');
      const deletedStudy = await Study.deleteOne({ _id: study_id }); // 스터디 삭제
      res.study = deletedStudy;
      res.status(200).json(deletedStudy);

      const deletedRelation = await StudyRelation.deleteMany({ study_id }); // 해당 스터디 아이디 관계 모두 삭제
      res.study_relation = deletedRelation;

      const deletedFeedback = await StudyFeedback.deleteMany({ study_id }); // 해당 스터디 피드백, 댓글 모두 삭제
      res.study_feedback = deletedFeedback;
    } catch (error) {
      console.log(error);
      res.status(426).json({
        code: 426,
        message: 'cannot delete study',
      });
    }
  },
};

module.exports = studyApi;
