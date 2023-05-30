const express = require('express');
const app = express();
require('dotenv').config();

// Middleware Library Import
const cors = require('cors');
const morgan = require('morgan');

// Router
const indexRouter = require('./src/routes/index');

// Middleware Setting
app.use(express.json());
app.use(cors());
app.use('/', indexRouter);
app.use(express.static('public'));

const port = 3000;
app.listen(port, () => {
  console.log(`Server Run http://localhost:${port}`);
});
