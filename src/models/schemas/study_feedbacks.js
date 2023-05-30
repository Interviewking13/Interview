const { Schema } = require('mongoose');

const StudyFeedbacksSchema = new Schema({
  study_id: { type: Number, required: true, unique: true, ref: 'Study' }, // reference
  study_name: { type: String, required: true, ref: 'Study' }, // reference
  user_id: { type: Number, required: true, unique: true, ref: 'User' }, // reference
  name: { type: String, required: true, ref: 'User' }, // reference
  feedback: { type: String, required: true },
  memoir: { type: String, required: true },
});

module.exports = StudyFeedbacksSchema;
