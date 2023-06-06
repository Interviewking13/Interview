const path = require("path");

module.exports = {
  entry: "./src/index.ts", // 진입 파일 경로
  output: {
    filename: "bundle.js", // 번들 파일 이름
    path: path.resolve(__dirname, "dist"), // 번들 파일 출력 경로
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"], // 해석할 파일 확장자
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // .ts 또는 .tsx 확장자 파일에 적용할 로더
        use: "ts-loader", // TypeScript 로더
        exclude: /node_modules/, // node_modules 폴더 제외
      },
    ],
  },
};
