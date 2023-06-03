const { StudyFeedback } = require('../models/index');
const { Study } = require('../models/index');
const { User } = require('../models/index');

const studyFeedbackApi = {
  /**피드백, 댓글 작성*/
  async newFeedback(req, res, next) {
    try {
      const user = await User.findOne().exec();
      const user_id = user._id;
      const user_name = user.user_name;
      req.body.user = { user_id, user_name };

      const study = await Study.findOne().exec();
      const study_id = study.study_id;
      const study_name = study.study_name;
      req.body.study = { study_id, study_name };

      const { content_type, content } = req.body;

      const createInfo = {
        study_id,
        study_name,
        user_id,
        user_name,
        content_type,
        content,
        // date: Timestamp,
      };

      const createdStudyFeedback = await StudyFeedback.create(createInfo);
      res.studyFeedback = createdStudyFeedback;

      res.status(200).json(createdStudyFeedback);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        code: 400,
        message: 'wrong request',
      });
    }
  },

  /**피드백, 댓글 조회*/
  async getStudyFeedback(req, res, next) {
    try {
      const user = await User.findOne().exec();
      const user_name = user.user_name;
      req.body.user = { user_name };
      // const { content_type } = req.params;

      const foundStudyFeedback = await StudyFeedback.findOne({ user_name });
      // if (!foundStudyFeedback) return error;

      res.status(200).json(foundStudyFeedback);
    } catch (error) {
      console.log(error);
      res.status(426).json({
        code: 426,
        message: 'error',
      });
    }
  },

  /**피드백, 댓글 수정*/
  async updateStudyFeedback(req, res, next) {
    try {
      const user = await User.findOne().exec();
      const user_name = user.user_name;
      req.body.user = { user_name };

      const { content_type, content } = req.body;

      const updateInfo = {
        content_type,
        content,
      };
      const foundStudyFeedback = await StudyFeedback.findOne({ user_name });
      if (!foundStudyFeedback) return console.error(error);

      const updatedStudyFeedback = await StudyFeedback.updateOne({ user_name }, updateInfo);

      res.status(200).json(updatedStudyFeedback);
    } catch (error) {
      console.log(error);
      res.status(425).json({
        code: 425,
        message: 'wrong update info',
      });
    }
  },

  /**피드백, 댓글 삭제*/
  async deleteStudyFeedback(req, res, next) {
    try {
      const user = await User.findOne().exec();
      const user_name = user.user_name;
      req.body.user = { user_name };

      const foundStudyFeedback = await StudyFeedback.findOne({ user_name });
      if (!foundStudyFeedback) return console.error(error);

      const deletedStudyFeedback = await StudyFeedback.deleteOne({ user_name });

      res.status(200).json(deletedStudyFeedback);
    } catch (error) {
      console.log(error);
      res.status(426).json({
        code: 426,
        message: 'cannot delete study feedback',
      });
    }
  },
};

module.exports = studyFeedbackApi;
