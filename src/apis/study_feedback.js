const { StudyFeedback } = require('../models/index');
const { Study } = require('../models/index');
const { User } = require('../models/index');

const studyFeedbackApi = {
  /**피드백, 댓글 작성*/
  async newFeedback(req, res, next) {
    try {
      const user_id = req.user._id;
      const { study_id } = req.params;
      const { content_type, content } = req.body;
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
      res.status(400).json({
        code: 400,
        message: 'wrong request',
      });
    }
  },

  /**피드백, 댓글 조회(전체)*/
  async getFeedback(req, res, next) {
    try {
      const { content_type } = req.params;
      const foundFeedback = await StudyFeedback.find({ content_type });
      if (!foundFeedback) throw new Error('Not found');
      res.status(200).json(foundFeedback);
    } catch (error) {
      console.log(error);
      res.status(426).json({
        code: 426,
        message: 'wrong request',
      });
    }
  },

  /**피드백, 댓글 조회 (개별) */
  async getFeedbackOne(req, res, next) {
    try {
      const user_id = req.user._id;
      const foundFeedback = await StudyFeedback.findOne({ user_id });
      if (!foundFeedback) throw new Error('Not found');
      res.status(200).json(foundStudy);
    } catch (error) {
      console.log(error);
      res.status(426).json({
        code: 426,
        message: 'study_id',
      });
    }
  },

  /**피드백, 댓글 수정*/
  async updateFeedback(req, res, next) {
    try {
      // 유저 권한 판단
      const user_id = req.user._id;
      const foundFeedback = await StudyFeedback.findOne({ user_id });
      if (!foundFeedback) throw new Error('Not found');

      // 피드백, 댓글 수정
      const { content } = req.body;
      const updateInfo = { content };
      const updatedFeedback = await StudyFeedback.updateOne({ user_id }, updateInfo);
      res.status(200).json(updatedFeedback);
    } catch (error) {
      console.log(error);
      res.status(426).json({
        code: 426,
        message: 'wrong request',
      });
    }
  },

  /**피드백, 댓글 삭제*/
  async deleteFeedback(req, res, next) {
    try {
      // 유저 권한 판단
      const user_id = req.user._id;
      const foundFeedback = await StudyFeedback.findOne({ user_id });
      if (!foundFeedback) throw new Error('Not found');

      // 피드백, 댓글 삭제
      const deletedFeedback = await StudyFeedback.deleteOne({ user_id }); // 피드백, 댓글 삭제
      res.study_feedback = deletedFeedback;
      res.status(200).json(deletedFeedback);
    } catch (error) {
      console.log(error);
      res.status(426).json({
        code: 426,
        message: 'cannot delete feedback',
      });
    }
  },
};

module.exports = studyFeedbackApi;
