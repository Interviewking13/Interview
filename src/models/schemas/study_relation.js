const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const StudyRelationSchema = new Schema({
  study_id: { type: mongoose.Types.ObjectId, unique: true, ref: 'Study' }, // reference
  user_id: { type: mongoose.Types.ObjectId, unique: true, ref: 'User' }, // reference
  user_type: { type: Boolean, defalut: 0 }, // 1: 스터디장, 0: 스터디원
});

module.exports = StudyRelationSchema;
