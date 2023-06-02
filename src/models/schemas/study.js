const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const StudySchema = new Schema({
  // ���͵� ����
  study_id: { type: mongoose.Types.ObjectId, unique: true }, // identification value
  study_name: { type: String, unique: true },
  title: { type: String },
  content: { type: String },
  start: { type: Date },
  end: { type: Date },
  deadline: { type: Date }, // �����Ϸᳯ¥
  headcount: { type: Number, maximum: 10 }, // �ִ� ���� �ο�
  chat_link: {
    type: String,
    // pattern: '^https?:\\/\\/(?:www\\.)?zoom\\.us\\/(?:j\\/|my\\/|meetings\\/join\\?)[^\\s]+$',
  },
  status: {
    // ���� ��: 0, ���� �Ϸ�: 1
    type: Number,
    default: 0,
  },

  // ���͵�� ��û ���� (���͵� ��û ��, ����ڰ� �Է�)
  user_name: { type: String, ref: 'User' }, // reference
  phone_number: { type: String, ref: 'User' }, // reference
  email: { type: String, unique: true, ref: 'User' }, // reference
  goal: { type: String }, // ��ǥ ��� �о� �� ���, ���� ��
});

module.exports = StudySchema;
