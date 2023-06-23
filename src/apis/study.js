const { Study } = require('../models/index');
const { User } = require('../models/index');
const { StudyRelation } = require('../models/index');
const { StudyFeedback } = require('../models/index');

// const mongoose = require('mongoose');
// const { ObjectId } = require('mongodb');

const studyApi = {
  /**스터디 개설*/
  async newStudy(req, res, next) {
    try {
      // 스터디 개설
      const leader_id = req.user.user_id;
      console.log(req.user);
      console.log(leader_id);
      const leader = await User.findOne({ _id: leader_id });
      console.log(leader.user_name);
      const { study_name, title, content, start, end, deadline, headcount, chat_link, status } =
        req.body;

      const createInfo = {
        leader_id,
        leader_name: leader.user_name,
        study_name,
        title,
        content,
        start,
        end,
        deadline,
        headcount,
        acceptcount: 0,
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
        user_id: leader_id,
        user_name: leader.user_name,
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
      const member_id = req.user.user_id;
      console.log(member_id);
      if (!member_id) throw new Error('Only logged-in people can apply'); // 로그인한 사람만 신청 가능
      const member = await User.findOne({ _id: member_id });
      console.log(member);

      const { study_id, goal } = req.body;
      const createInfo = {
        user_id: member_id,
        user_name: member.user_name,
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
      res.status(401).json({
        code: 401,
        message: 'The leader cannot apply.',
      });
    }
  },

  /**스터디 신청 수락*/
  async acceptStudy(req, res, next) {
    try {
      const { member_id, study_id } = req.params;
      const leader_id = req.user.user_id;

      // 스터디장 권한 판단
      const leader = await StudyRelation.findOne({ user_id: leader_id, study_id });
      if (!leader || leader.is_leader === false) throw new Error('Not leader');
      console.log(leader);

      // 스터디 신청 수락
      const { accept } = req.body;
      const updateInfo = { accept };
      const updatedStudyRelation = await StudyRelation.updateOne(
        { user_id: member_id, study_id },
        updateInfo,
      );
      console.log(updateInfo);
      res.status(200).json(updatedStudyRelation);

      // 스터디 신청 수락 인원 1 증가
      const foundStudy = await Study.findOne({ _id: study_id });
      console.log(foundStudy);
      if (accept === 1) foundStudy.acceptcount += 1;
      const updatedStudy = await foundStudy.save();
      res.study = updatedStudy;
    } catch (error) {
      console.log(error);
      res.status(402).json({
        code: 402,
        message: 'The member cannot have authorization to accept study application.',
      });
    }
  },

  /**스터디 신청 완료 or 신청 수락 명단 조회*/
  async acceptRelation(req, res, next) {
    try {
      const { study_id, accept } = req.params;
      // const leader_id = req.user.user_id;

      // // 스터디장 권한 판단
      // const leader = await StudyRelation.findOne({ user_id: leader_id, study_id });
      // if (!leader || leader.is_leader === false) throw new Error('Not leader');
      // console.log(leader);

      // 명단 조회
      const foundRelation = await StudyRelation.find({ study_id, accept });
      console.log(foundRelation);
      if (!foundRelation) throw new Error('Not found');
      res.status(200).json(foundRelation);
    } catch (error) {
      console.log(error);
      res.status(403).json({
        code: 403,
        message: 'Not leader',
      });
    }
  },

  /**스터디 정보 조회(전체)*/
  async getStudy(req, res, next) {
    try {
      const foundStudy = await Study.find({});
      if (!foundStudy) throw new Error('Not found');
      res.status(200).json(foundStudy);
    } catch (error) {
      console.log(error);
      res.status(403).json({
        code: 403,
        message: 'Not found',
      });
    }
  },

  /**스터디 정보 조회(모집 중)*/
  async getStudyOne(req, res, next) {
    try {
      const { study_id } = req.params;
      const foundStudy = await Study.findOne({ _id: study_id });
      if (!foundStudy) throw new Error('Not found study');
      res.status(200).json(foundStudy);
    } catch (error) {
      console.log(error);
      res.status(404).json({
        code: 404,
        message: 'Not found study',
      });
    }
  },

  /**스터디 정보 수정*/
  async updateStudy(req, res, next) {
    try {
      // 스터디장 권한 판단
      const { study_id } = req.params;
      const leader_id = req.user.user_id;
      const leader = await StudyRelation.findOne({ user_id: leader_id, study_id });
      if (!leader || leader.is_leader === false) throw new Error('Not leader');
      console.log(leader);

      // 스터디 정보 수정
      const {
        study_name,
        title,
        content,
        start,
        end,
        deadline,
        headcount,
        acceptcount,
        chat_link,
        status,
      } = req.body;
      const updateInfo = {
        study_name,
        title,
        content,
        start,
        end,
        deadline,
        headcount,
        acceptcount,
        chat_link,
        status,
      };
      const updatedStudy = await Study.updateOne({ _id: study_id }, updateInfo);
      res.status(200).json(updatedStudy);
    } catch (error) {
      console.log("Elice Check!!!", error);
      res.status(402).json({
        code: 402,
        message: 'The member cannot have authorization to update.',
      });
    }
  },

  /**스터디 회원 관리*/
  async deleteUser(req, res, next) {
    try {
      // 스터디장 권한 판단
      const { study_id, member_id } = req.params;
      const leader_id = req.user.user_id;
      const leader = await StudyRelation.findOne({ user_id: leader_id, study_id });
      if (!leader || leader.is_leader === false) throw new Error('Not leader');
      console.log(leader);

      // 스터디 회원 관리
      const deletedRelation = await StudyRelation.deleteOne({ user_id: member_id }); // 특정 유저 스터디에서 삭제
      res.study_relation = deletedRelation;
      res.status(200).json(deletedRelation);

      const deletedFeedback = await StudyFeedback.deleteOne({ user_id: member_id }); // 특정 유저가 쓴 피드백을 삭제
      res.study_feedback = deletedFeedback;
    } catch (error) {
      console.log(error);
      res.status(402).json({
        code: 402,
        message: 'The member cannot have authorization to delete.',
      });
    }
  },

  /**스터디 탈퇴*/
  async leaveUser(req, res, next) {
    try {
      // 스터디장이면 스터디도 삭제
      const leader_id = req.user.user_id;
      const { study_id } = req.body;
      const user = await StudyRelation.findOne({ user_id: leader_id, study_id });
      console.log(user);
      if (user.is_leader === true) {
        const deletedStudy = await Study.deleteOne({ _id: study_id });
        res.Study = deletedStudy;
      }

      // 해당 스터디 아이디 관계 모두 삭제
      if (user.is_leader === true || user.is_leader === false) {
        const deletedRelation = await StudyRelation.deleteMany({ user_id: leader_id });
        res.study_relation = deletedRelation;
        res.status(200).json(deletedRelation);

        // 해당 스터디 피드백, 댓글 모두 삭제
        const deletedFeedback = await StudyFeedback.deleteMany({ user_id: leader_id });
        res.study_feedback = deletedFeedback;
      }
    } catch (error) {
      console.log(error);
      res.status(405).json({
        code: 405,
        message: 'wrong request',
      });
    }
  },

  /**스터디 삭제*/
  async deleteStudy(req, res, next) {
    try {
      // 스터디장 권한 판단
      const { study_id } = req.params;
      const leader_id = req.user.user_id;
      const leader = await StudyRelation.findOne({ user_id: leader_id, study_id });
      if (!leader || leader.is_leader === false) throw new Error('Not leader');
      console.log(leader);

      // 스터디 삭제
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
      res.status(402).json({
        code: 402,
        message: 'The member cannot have authorization to delete study.',
      });
    }
  },
};

module.exports = studyApi;
