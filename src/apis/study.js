const { Study } = require('../models/index');
const { User } = require('../models/index');
const { StudyRelation } = require('../models/index');

const studyApi = {
  /**스터디 개설*/
  async newStudy(req, res, next) {
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

  /**스터디 신청*/
  async applyStudy(req, res, next) {
    try {
      const user = await User.findOne().exec();
      const user_id = user._id;
      const user_name = user.user_name;
      const email = user.email;
      const phone_number = user.phone_number;
      req.body.user = { user_id, user_name, email, phone_number };

      const study = await Study.findOne().exec();
      const study_id = study.study_id;
      const study_name = study.study_name;
      req.body.study = { study_id, study_name };

      const { goal, accept } = req.body;

      const createInfo = {
        study_id,
        study_name,
        user_id,
        user_name,
        email,
        phone_number,
        goal,
        accept,
      };

      const applyedStudy = await Study.create(createInfo);
      res.study = applyedStudy;

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
      const study_relation = await StudyRelation.findOne().exec();
      const user_id = study_relation.user_id;
      const study_id = study_relation.study_id;
      const user_type = study_relation.user_type;
      req.body.study_relation = { user_id, study_id, user_type }; // 한 번 신청했던 user_id, study_id를 동일하게 사용하면 dumplicate error?

      const { accept } = req.body;

      const createInfo = {
        study_id,
        user_id,
        user_type,
        accept,
      };

      const acceptedStudy = await Study.create(createInfo);
      res.study = acceptedStudy;

      res.status(200).json(acceptedStudy);
    } catch (error) {
      console.log(error);
      const study_relation = await StudyRelation.findOne().exec();
      const user_type = study_relation.user_type;
      if (user_type === 'member') {
        res.status(422).json({
          code: 422,
          message: 'Only leader can accept',
        });
      }
    }
  },

  /**스터디 정보 조회*/ // 현재 유저 정보 조회는 안 됨
  async getStudy(req, res, next) {
    try {
      const { study_id } = req.params;
      const foundStudy = await Study.findOne({ _id: study_id });

      if (!foundStudy) return error;

      res.status(200).json(foundStudy);
    } catch (error) {
      console.log(error);
      res.status(426).json({
        code: 426,
        message: 'study_id',
      });
    }
  },

 
  async updateStudy(req, res, next) {
    try {
      const { userId } = req.params;
      const user = await User.findOne({ _id: userId });
      const { study_id } = req.params;
      const study = await Study.findOne({ _id: study_id });
      if (!user) return console.error(error);
      if (!study) return console.error(error);

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

      const updatedStudy = await Study.updateOne({ user_id }, updateInfo);

      res.status(200).json(updatedStudy);
    } catch (error) {
      const { userId } = req.params;
      const relation = await StudyRelation.findOne({ user_id: userId });
      if (!relation) {
        res.status(422).json({
          // ���� ���� �ڵ带 401(Unauthorized)���� ����
          code: 422,
          message: 'Only leader can update', // ���� �޽����� Ŭ���̾�Ʈ���� ��ȯ
        });
      }
    }
  },

  /**스터디 회원 관리*/ // 현재 스터디장 권한 고려X, 유저 아이디 불러와서 유저 삭제 기능 구현X
  /**스터디 삭제*/
  async deleteStudy(req, res, next) {
    try {
      const { _id } = req.params;
      const study_id = _id;
      const foundStudy = await Study.findOne({ study_id });

      if (!foundStudy) return console.error(error);

      const deletedStudy = await Study.deleteOne({ study_id });

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
