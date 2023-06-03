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

app.listen(3000, () => {
  console.log(`포트열렸다`);
});
