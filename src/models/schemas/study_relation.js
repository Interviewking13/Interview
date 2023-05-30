const { Schema } = require('mongoose');

const StudyRelationSchema = new Schema({
  study_id: { type: Number, required: true, unique: true, ref: 'Study' }, // reference
  user_id: { type: Number, required: true, unique: true, ref: 'User' }, // reference
  user_type: { type: String, defalut: 'member', required: true }, // leader: 스터디장, member: 스터디원
});

module.exports = StudyRelationSchema;
