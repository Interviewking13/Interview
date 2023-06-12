const { StudyFeedback } = require('../models/index');
const { Study } = require('../models/index');
const { User } = require('../models/index');

const studyFeedbackApi = {
  /**피드백, 댓글 작성*/
  async newFeedback(req, res, next) {
    try {
      const user_id = req.user._id;
      const { study_id, content_type, content } = req.body;
      const createInfo = {
        user_id,
        study_id,
        content_type,
        content,
      };

      const createdFeedback = await StudyFeedback.create(createInfo);
      res.study_feedback = createdFeedback;
      res.status(200).json(createdFeedback);
    } catch (error) {
      console.log(error);
      res.status(407).json({
        code: 407,
        message: 'wrong request',
      });
    }
  },

  /**피드백, 댓글 조회(스터디별)*/
  async studyFeedback(req, res, next) {
    try {
      const { study_id } = req.params;
      const foundFeedback = await StudyFeedback.find({ study_id });
      if (!foundFeedback) throw new Error('Not found study feedback');
      res.status(200).json(foundFeedback);
    } catch (error) {
      console.log(error);
      res.status(408).json({
        code: 408,
        message: 'Not found study feedback',
      });
    }
  },

  /**피드백, 댓글 조회(유저별)*/
  async userFeedback(req, res, next) {
    try {
      const { user_id } = req.body;
      console.log(user_id);
      const foundFeedback = await StudyFeedback.find({ user_id });
      console.log(foundFeedback);
      if (!foundFeedback) throw new Error('Not found user feedback');
      res.status(200).json(foundFeedback);
    } catch (error) {
      console.log(error);
      res.status(409).json({
        code: 409,
        message: 'Not found user feedback',
      });
    }
  },

  /**피드백, 댓글 수정*/
  async updateFeedback(req, res, next) {
    try {
      // 유저 권한 판단
      const { study_id, content_type, content } = req.body;
      const user_id = req.user._id;
      const foundFeedback = await StudyFeedback.findOne({ user_id, study_id });
      if (!foundFeedback) throw new Error('Not authorizaion');

      // 피드백, 댓글 수정
      const updateInfo = { content_type, content };
      const updatedFeedback = await StudyFeedback.updateOne({ user_id, study_id }, updateInfo);
      res.status(200).json(updatedFeedback);
    } catch (error) {
      console.log(error);
      res.status(410).json({
        code: 410,
        message: 'Not authorizaion',
      });
    }
  },

  /**피드백, 댓글 삭제*/
  async deleteFeedback(req, res, next) {
    try {
      // 유저 권한 판단
      const { study_id } = req.params;
      const user_id = req.user._id;
      const foundFeedback = await StudyFeedback.findOne({ user_id, study_id });
      if (!foundFeedback) throw new Error('Not authorizaion');

      // 피드백, 댓글 삭제
      const deletedFeedback = await StudyFeedback.deleteOne({ user_id, study_id }); // 피드백, 댓글 삭제
      res.study_feedback = deletedFeedback;
      res.status(200).json(deletedFeedback);
    } catch (error) {
      console.log(error);
      res.status(410).json({
        code: 410,
        message: 'Not authorizaion',
      });
    }
  },
};

module.exports = studyFeedbackApi;
