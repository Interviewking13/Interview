const { Schema } = require('mongoose');

const StudyFeedbackSchema = new Schema({
  study_id: { type: Number, required: true, unique: true, ref: 'Study' }, // reference
  study_name: { type: String, required: true, ref: 'Study' }, // reference
  user_id: { type: Number, required: true, unique: true, ref: 'User' }, // reference
  name: { type: String, required: true, ref: 'User' }, // reference
  date: { type: Date, default: Date.now },
  feedback: { type: String, required: true },
  // ��� ��Ű���� ��� ǥ��?
});

module.exports = StudyFeedbackSchema;
