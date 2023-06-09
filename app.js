require("dotenv").config({ path: ".env" });

const express = require('express');
const app = express();
const PORT = process.env.PORT;

// Router
const indexRouter = require('./src/routes/index');

// Middleware Setting
app.use(express.json());
app.use(express.static('public'));
app.use('/', indexRouter);

// PORT
app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});

