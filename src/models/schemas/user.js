const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    // user_id: { type: mongoose.Types.ObjectId, required: true, unique: true },    // identification value
    // user_id: { type: mongoose.Types.ObjectId, unique: true }, // identification value   //회원가입 테스트
    user_name: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: false },
    privacy_use_yn: { type: String, required: true, unique: false, default: true },
    marketing_use_yn: { type: String, required: true, unique: false, default: false },
    intro_yn: { type: String, required: false, unique: false, default: '' },
    phone_number: { type: String, required: false, unique: false, default: '' },
    admin_yn: { type: Boolean, required: false, unique: false, default: false },
    dts_insert: { type: String, required: true, unique: false, default: '' },
    dts_update: { type: String, unique: false, default: '' },
  },
  {
    versionKey: false,
  },
);

module.exports = UserSchema;
