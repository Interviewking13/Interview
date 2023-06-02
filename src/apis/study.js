const { Study } = require('../models/index');

const studyApi = {
  /**���͵� ����*/
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

  /**���͵� ��û*/ // ���� ���̵� �ʼ��� ����ؼ� get �޼��� ����ؾ��� �� ����, post�� db�� ���Ӱ� �����
  async applyStudy(req, res, next) {
    try {
      const { user_name, email, phone_number, goal, hope } = req.body;
      const { study_id, study_name } = req.query;

      const createInfo = {
        study_id,
        study_name,
        user_name,
        email,
        phone_number,
        goal,
        hope,
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

  /**���͵� ���� ��ȸ*/ // ���� ���� ���� ��ȸ�� �� ��
  async getStudy(req, res, next) {
    try {
      const { _id } = req.params;
      const study_id = _id;
      const foundStudy = await Study.findOne({ study_id });

      // if (!foundStudy) return error;

      res.status(200).json(foundStudy);
    } catch (error) {
      console.log(error);
      res.status(426).json({
        code: 426,
        message: 'study_id',
      });
    }
  },

  /**���͵� ���� ����*/ // ���� ���͵����� ���� ������ ����
  async updateStudy(req, res, next) {
    try {
      const { _id } = req.params;
      const study_id = _id;
      const { study_name, title, content, deadline, headcount, chat_link, status } = req.body;

      const updateInfo = {
        study_name,
        title,
        content,
        deadline,
        chat_link,
        status,
      };
      const foundStudy = await Study.findOne({ study_id });

      if (!foundStudy) return console.error(error);

      const updatedStudy = await Study.updateOne({ study_id }, updateInfo);

      res.status(200).json(updatedStudy);
    } catch (error) {
      console.log(error);
      res.status(425).json({
        code: 425,
        message: 'wrong update info',
      });
    }
  },

  /**���͵� ȸ�� ����*/ // ���� ���͵��� ���� ���X, ���� ���̵� �ҷ��ͼ� ���� ���� ��� ����X
  /**���͵� ����*/
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
