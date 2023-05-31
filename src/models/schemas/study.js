const { Schema } = require('mongoose');

const StudySchema = new Schema({
  // ���͵� ����
  study_id: { type: mongoose.Types.ObjectId, required: true, unique: true }, // identification value
  study_name: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  deadline: { type: Date, required: true }, // �����Ϸᳯ¥
  headcount: { type: Number, maximum: 10, required: true }, // �ִ� ���� �ο�
  chat_link: {
    type: String,
    pattern: '^https?:\\/\\/(?:www\\.)?zoom\\.us\\/(?:j\\/|my\\/|meetings\\/join\\?)[^\\s]+$',
    required: true,
  },
  status: {
    // ���� ����: 1, ���� ��: 2, ���͵� ����: 3
    type: Number,
    required: true,
    default: 1,
  },

  // ���͵�� ��û ���� (���͵� ��û ��, ����ڰ� �Է�)
  user_name: { type: String, required: true, ref: 'User' }, // reference
  phone_number: { type: String, required: true, ref: 'User' }, // reference
  email: { type: String, required: true, unique: true, ref: 'User' }, // reference
  goal: { type: String, required: true }, // ��ǥ ��� �о� �� ���
  hope: { type: String, required: true }, // ���� �� ����
  //   self_intro: { type: Buffer, required: true }, // �ڱ�Ұ���
});

module.exports = StudySchema;
