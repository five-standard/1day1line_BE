require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./src/config/config");
const router = require("./src/route");
const morgan = require("morgan");
const { sequelize } = require("./models");

const app = express();

sequelize
  .sync({ force: false }) // 서버 실행시 MySQL 과 연동되도록 하는 sync 메서드
  // force : true 로 해놓으면 서버 재시작마다 테이블이 재생성됨. 테이블을 잘못 만든 경우에 true 로 설정
  .then(() => {
    console.log("데이터 베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(router);
app.use(morgan("dev"));

const port = config.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}!`));
