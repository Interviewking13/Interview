const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const StudyFeedbackSchema = new Schema({
  study_id: { type: mongoose.Types.ObjectId, unique: true, ref: 'Study' }, // reference
  study_name: { type: String, ref: 'Study' }, // reference
  user_id: { type: mongoose.Types.ObjectId, unique: true, ref: 'User' }, // reference
  user_name: { type: String, ref: 'User' }, // reference
  content_type: { type: String, defalut: 'feedback', required: true }, // feedback: �ǵ�� ����, reply: �ǵ�� ���
  content: { type: String },
  date: { type: Date, defalut: Date.now }, // ����ۼ��Ͻ�
});

module.exports = StudyFeedbackSchema;
