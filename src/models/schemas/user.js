const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    user_id: { type: mongoose.Types.ObjectId }, // identification value   // 실제로는 _id 값으로 식별하지만, user_id 도 필요하다고 해서 추가!
    user_name: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, unique: false },//required: true
    privacy_use_yn: { type: String, required: true, unique: false, default: true },
    marketing_use_yn: { type: String, required: true, unique: false, default: false },
    intro_yn: { type: String, required: false, unique: false, default: '' },
    phone_number: { type: String, required: false, unique: false, default: '' },
    file_key: { type: String, unique: false, default: '' },
    file_name: { type: String, unique: false, default: '' },
    admin_yn: { type: Boolean, required: false, unique: false, default: false },
    dts_insert: { type: String, unique: false, default: '' }, //required: true, 
    dts_update: { type: String, unique: false, default: '' },
    //SNS 로그인
    sns_id: { type: String },
    provider: { type: String, enum: ["google", "kakao", "naver", "etc"], default: "etc" },
  },
  {
    versionKey: false,
  },
);

module.exports = UserSchema;
