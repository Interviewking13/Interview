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


// 보안 설정을 사용하여 Swagger UI 노출
const swaggerOptions = {
  swaggerOptions: {
    // "Authorize" 버튼을 활성화할 보안 설정 이름 지정 (예: JWT)
    customSiteTitle: "Authorize JWT", // 버튼에 표시할 이름
    customfavIcon: "/favicon.ico",
    customJs: "/config/swaggerCustom.js",
  },
};

/** swagger setup */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, swaggerOptions));

/** PORT */
app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});