const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const StudyRelationSchema = new Schema({
  study_id: { type: mongoose.Types.ObjectId, unique: true, ref: 'Study' }, // reference
  user_id: { type: mongoose.Types.ObjectId, unique: true, ref: 'User' }, // reference
  user_type: { type: String, defalut: 'member' }, // leader: ���͵���, member: ���͵��
});

module.exports = StudyRelationSchema;
