const { Schema } = require('mongoose');

const StudySchema = new Schema(
  {
    // ���͵� ����
    study_id: { type: Number, required: true, unique: true }, // primary key
    user_id: { type: Number, required: true, unique: true, ref: 'User' }, // foreign key; ���͵���
    study_name: { type: String, required: true },
    title: { type: String, required: true },
    period: { type: String, required: true },
    headcount: { type: Number, maximum: 10, required: true },
    chat_link: {
      type: String,
      pattern: '^https?:\\/\\/(?:www\\.)?zoom\\.us\\/(?:j\\/|my\\/|meetings\\/join\\?)[^\\s]+$',
      required: true,
    },

    // ���͵�� ��û ���� (���͵� ��û ��, ����ڰ� �Է�)
    user_id: { type: String, required: true },
    name: { type: String, required: true, ref: 'User' }, // foreign key
    phone_number: { type: String, required: true, ref: 'User' }, // foreign key
    email: { type: String, required: true, unique: true, ref: 'User' }, // foreign key
    goal: { type: String, required: true }, // ��ǥ ��� �о� �� ���
    hope: { type: String, required: true }, // ���� �� ����
  },
  //   {
  //     collection: 'stydy',
  //     timestamps: true,
  //   },
);

module.exports = StudySchema;
