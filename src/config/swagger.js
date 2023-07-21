const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {         // info 객체는 title, version, description을 설정
            title: "interviewKing",
            version: "1.0.0",
            description: "InterviewKing API"
        },
        securityDefinitions: { // 헤더의 Authorization안에 값을 넣어줄수 있는 기능
        Authorization: {
            type: "apiKey",
            name: "Authorization",
            scheme: "bearer",
            in: "header",
        },
        },
        security: [ // 헤더의 Authorization안에 값을 넣어줄수 있는 기능
        {
            Authorization: [],
        },
        ],
        servers: [
            {
                url: "https://interviewking.onrender.com",
                description: "deploy Server",
            },
            {
                url: "http://localhost:5000",
                description: "dev Server",
            },
        ],
    },
    apis: ["./src/routes/user.js"],     // api는 /routes 파일 아래 js 파일 내에 정의하고 있으며, /swagger 폴더 아래 swagger 설정을 정의하고 있다
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };

