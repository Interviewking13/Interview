const { Schema } = require('mongoose');

const StudyFeedbackSchema = new Schema({
  study_id: { type: mongoose.Types.ObjectId, required: true, unique: true, ref: 'Study' }, // reference
  study_name: { type: String, required: true, ref: 'Study' }, // reference
  user_id: { type: mongoose.Types.ObjectId, required: true, unique: true, ref: 'User' }, // reference
  user_name: { type: String, required: true, ref: 'User' }, // reference
  content_type: { type: String, defalut: 'feedback', required: true }, // feedback: �ǵ�� ����, reply: �ǵ�� ���
  content: { type: String, required: true },
  date: { type: Date, required: true, defalut: Date.now }, // ����ۼ��Ͻ�
});

module.exports = StudyFeedbackSchema;
