const { Schema } = require('mongoose');

const StudySchema = new Schema({
  // ���͵� ����
  study_id: { type: Number, required: true, unique: true }, // identification value
  study_name: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  deadline: { type: Date, required: true },
  headcount: { type: Number, maximum: 10, required: true },
  category: { type: String, enum: ['����', '����'], required: true },
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
  name: { type: String, required: true, ref: 'User' }, // reference
  phone_number: { type: String, required: true, ref: 'User' }, // reference
  email: { type: String, required: true, unique: true, ref: 'User' }, // reference
  goal: { type: String, required: true }, // ��ǥ ��� �о� �� ���
  hope: { type: String, required: true }, // ���� �� ����
});

module.exports = StudySchema;
