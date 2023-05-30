const mongoose = require('mongoose');

// DB ����
mongoose
  .connect(process.env.DB_Link, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // 10��
    socketTimeoutMS: 45000, // 45��
    family: 4, // IPv4
  })
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.log(err));

module.exports = mongoose;
