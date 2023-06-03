const express = require('express');
const app = express();
const http = require('http');
const PORT = process.env.PORT;
require('dotenv').config();

// Router
const indexRouter = require('./src/routes/index');

// Middleware Setting
app.use(express.json());
app.use(express.static('public'));
app.use('/', indexRouter);

<<<<<<< HEAD
app.listen(3000, () => {
=======
app.listen(3000, () => { /** [QA] PORT 기재 시 연결안됨 */
>>>>>>> 8212dee7f217b3d4b0f441b0b66f53c1943ee145
  console.log(`포트열렸다`);
});
