const mongoose = require('../config/database');

const CommunitySchema = require('./schemas/community');
const CommunityReplySchema = require('./schemas/community_reply');
const UserSchema = require('./schemas/user');
const StudySchema = require('./schemas/study');
const StudyRelationSchema = require('./schemas/study_relation');
const StudyFeedbackSchema = require('./schemas/study_feedback');

exports.Community = mongoose.model('Community', CommunitySchema);
exports.CommunityReply = mongoose.model('CommunityReply', CommunityReplySchema);
exports.User = mongoose.model('User', UserSchema);
exports.Study = mongoose.model('Study', StudySchema);
exports.StudyRelation = mongoose.model('StudyRelation', StudyRelationSchema);
exports.StudyFeedback = mongoose.model('StudyFeedback', StudyFeedbackSchema);
