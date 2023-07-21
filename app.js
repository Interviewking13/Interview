require('dotenv').config({ path: '.env' });

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { swaggerUi, specs } = require("./src/config/swagger");
const PORT = process.env.PORT;

/** Router */
const indexRouter = require('./src/routes/index');

/** JWT token Middleware */
const cookieParser = require('cookie-parser');
app.use(cookieParser());

/** Middleware Setting */
app.use(express.json());
app.use(express.static('public'));
app.use('/', indexRouter);

/** swagger setup */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

/** PORT */
app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});