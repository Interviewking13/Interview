const { StudyFeedback } = require('../models/index');

const studyFeedbackApi = {
  /**스터디 개설*/
  async newFeedback(req, res, next) {
    try {
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
    } catch (error) {
      console.log(error);
      res.status(400).json({
        code: 400,
        message: 'wrong request',
      });
    }
  },
};

module.exports = studyFeedbackApi;
