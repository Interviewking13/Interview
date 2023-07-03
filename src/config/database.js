const mongoose = require('mongoose');

// DB 연결
mongoose
  .connect(DB_Link, {         // .connect(process.env.DB_Link, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // 10초
    socketTimeoutMS: 45000, // 45초
    family: 4, // IPv4
  })
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.log(err));

module.exports = mongoose;
