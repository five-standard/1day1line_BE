const { sequelize, book } = require("./models");
const bodyParser = require("body-parser");
const router = require("./src/route");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();

// force : 재시작마다 테이블 초기화 여부
// sync : 데이터베이스와 연동
sequelize
  .sync({ force: false })
  .then(() => console.log("연결 성공"))
  .catch((err) => console.log(err));

// origin 상관 없이 모든 형태의 요청의 CORS 무시
// 사실 무시인진 모르겠다, 이게 무슨 작용을 하는걸까?
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan("dev"));
app.use(router);

app.listen(process.env.PORT, () => console.log(process.env.PORT, "에서 켜짐"));
