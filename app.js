const express = require('express');
const app = express();
const PORT = process.env.PORT;
require('dotenv').config();

// Router
const indexRouter = require('./src/routes/index');

// Middleware Setting
app.use(express.json());
app.use(express.static('public'));
app.use('/', indexRouter);

app.listen(3000, () => { /** [QA] PORT 기재 시 연결안됨 */
  console.log(`포트열렸다`);
});
