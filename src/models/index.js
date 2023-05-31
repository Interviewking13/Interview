const mongoose = require('../config/database');

const CommunitySchema = require('./schemas/community');
const UserSchema = require('./schemas/user');

exports.Community = mongoose.model('Community', CommunitySchema);
exports.User = mongoose.model('User', UserSchema);
