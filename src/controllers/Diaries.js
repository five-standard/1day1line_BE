const { diary } = require("../../models");
const { Op } = require("sequelize");
const dayjs = require("dayjs");

const writeDiary = async (req, res) => {
  const { content } = req.body;
  const { uuid } = req.headers;

  const data = await diary.findOne({
    where: { date: dayjs().format("YYYYMMDD"), writerId: uuid },
  });

  await diary.create({
    content: content,
    date: dayjs().format("YYYYMMDD"),
    isTop: data === null,
    writerId: uuid,
  });
  return res.status(200).json();
};

const listDiary = async (req, res) => {
  const { uuid } = req.headers;
  const { year, month } = req.query;

  if (uuid === undefined) {
    return res.status(403).json("계정이 없습니다");
  }

  const datas = await diary.findAll({
    where: {
      date: { [Op.like]: `${year}${month}%` },
      isTop: true,
      writerId: uuid,
    },
  });

  return res.status(200).json(
    datas.map((i) => {
      return { date: Number(i.date.slice(6, 8)), content: i.content };
    })
  );
};

const detailDiary = async (req, res) => {
  const { date } = req.query;
  const { uuid } = req.headers;

  const diaries = await diary.findAll({
    where: { date: date, writerId: uuid },
  });
  return res.status(200).json(diaries.map((i) => i.dataValues));
};

const setTopDiary = async (req, res) => {
  const { date, id } = req.body;
  const { uuid } = req.headers;
  const datas = await diary.findAll({ where: { date: date, writerId: uuid } });

  datas.map((i) => i.update({ isTop: i.dataValues.id === id ? true : false }));

  return res.status(200).json(datas.map((i) => i.dataValues));
};

const searchDiary = async (req, res) => {
  const { content } = req.query;
  const { uuid } = req.headers;

  if (content !== "") {
    const datas = await diary.findAll({
      where: {
        content: { [Op.like]: `%${content}%` },
        writerId: uuid,
      },
    });

    return res.status(200).json(datas.map((i) => i.dataValues));
  } else {
    return res.status(200).json(null);
  }
};

module.exports = {
  writeDiary,
  listDiary,
  detailDiary,
  setTopDiary,
  searchDiary,
};
