const { StudyRelation } = require('../models/index');
const { Study } = require('../models/index');
const { User } = require('../models/index');

const studyRelationApi = {
  /**스터디장 권한 등록*/
  async newLeader(req, res, next) {
    try {
      //   const user = await User.findOne({ user_id }).exec();
      //   const user_id = user._id;
      //   req.body.user = { user_id };

      //   const study = await Study.findOne({ study_id }).exec();
      //   const study_id = study.study_id;
      //   req.body.study = { study_id };

      const { user_id, study_id, user_type } = req.body;

      const createInfo = {
        user_id,
        study_id,
        user_type,
      };

      const createdLeader = await StudyRelation.create(createInfo);
      res.study = createdLeader;

      res.status(200).json(createdLeader);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        code: 400,
        message: 'wrong request',
      });
    }
  },
};

module.exports = studyRelationApi;
