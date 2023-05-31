const { Schema } = require('mongoose');

const StudyFeedbackSchema = new Schema({
  study_id: { type: mongoose.Types.ObjectId, required: true, unique: true, ref: 'Study' }, // reference
  study_name: { type: String, required: true, ref: 'Study' }, // reference
  user_id: { type: mongoose.Types.ObjectId, required: true, unique: true, ref: 'User' }, // reference
  user_name: { type: String, required: true, ref: 'User' }, // reference
  content_type: { type: String, defalut: 'feedback', required: true }, // feedback: 피드백 본문, reply: 피드백 댓글
  content: { type: String, required: true },
  date: { type: Date, required: true, defalut: Date.now }, // 댓글작성일시
});

module.exports = StudyFeedbackSchema;
