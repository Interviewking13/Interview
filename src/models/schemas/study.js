const { Schema } = require('mongoose');

const StudySchema = new Schema(
  {
    // 스터디 정보
    study_id: { type: Number, required: true, unique: true }, // primary key
    user_id: { type: Number, required: true, unique: true, ref: 'User' }, // foreign key; 스터디장
    study_name: { type: String, required: true },
    title: { type: String, required: true },
    period: { type: String, required: true },
    headcount: { type: Number, maximum: 10, required: true },
    chat_link: {
      type: String,
      pattern: '^https?:\\/\\/(?:www\\.)?zoom\\.us\\/(?:j\\/|my\\/|meetings\\/join\\?)[^\\s]+$',
      required: true,
    },

    // 스터디원 신청 정보 (스터디 신청 시, 사용자가 입력)
    user_id: { type: String, required: true },
    name: { type: String, required: true, ref: 'User' }, // foreign key
    phone_number: { type: String, required: true, ref: 'User' }, // foreign key
    email: { type: String, required: true, unique: true, ref: 'User' }, // foreign key
    goal: { type: String, required: true }, // 목표 산업 분야 및 기업
    hope: { type: String, required: true }, // 포부 한 마디
  },
  //   {
  //     collection: 'stydy',
  //     timestamps: true,
  //   },
);

module.exports = StudySchema;
