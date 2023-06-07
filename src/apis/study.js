const { Study } = require('../models/index');
const { User } = require('../models/index');
const { StudyRelation } = require('../models/index');
const mongoose = require('mongoose');
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
      console.log(error);
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
      // const studyId = req.query;
      // const study_id = mongoose.Types.ObjectId(studyId);
      // console.log(typeof study_id);
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
      const { user_id, study_id } = req.params;
      // const member = StudyRelation.findOne({ user_id: member_id });
      // if (!member || member.is_leader === 0)
      //   throw new Error('You do not have authorization to accept study applications.');

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

  /**스터디 정보 조회*/
  async getStudy(req, res, next) {
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
      const { study_id } = req.params;
      // 스터디장인지 판단
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

  /**스터디 회원 관리*/ // 그 유저가 쓴 피드백도 모두 삭제 해야함
  async deleteUser(req, res, next) {
    try {
      const { user_id } = req.user._id;
      const foundRelation = await StudyRelation.findOne({ user_id });
      if (!foundRelation) throw new Error('Not found');

      const deletedRelation = await StudyRelation.deleteOne({ user_id }); // 특정 유저 스터디에서 삭제
      res.study_relation = deletedRelation;
      res.status(200).json(deletedRelation);
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
      const { study_id } = req.user._id;
      const foundStudy = await Study.findOne({ _id: study_id });
      if (!foundStudy) throw new Error('Not found');

      const deletedStudy = await Study.deleteOne({ _id: study_id }); // 스터디 삭제
      const deletedRelation = await StudyRelation.deleteMany({ study_id }); // 해당 스터디 아이디 관계 모두 삭제
      res.study_relation = deletedRelation;
      res.status(200).json(deletedStudy);
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
