const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    user_id: { type: mongoose.Types.ObjectId, required: true, unique: true }, // identification value
    user_name: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: false },
    privacy_use_yn: { type: String, required: true, unique: false },
    marketing_use_yn: { type: String, required: true, unique: false },
    intro_yn: { type: String, required: false, unique: false },               // 자기소개서
    phone_number: { type: String, required: false, unique: false },
    admin_yn: { type: boolean, required: false, unique: false },
    dts_insert: {type: Date, required: true, unique: false }
});

module.exports = UserSchema;