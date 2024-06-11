const { book } = require("../../models");

const findUsers = async (req, res) => {
  const { uuid } = req.headers;

  if (uuid === undefined) {
    return res.status(403).json("게정이 없습니다");
  }

  const data = await book.findOne({ where: { uuid: uuid } });

  if (data === null) {
    return res.status(404).json({
      message: "존재하지 않는 계정입니다.",
    });
  } else {
    return res.json({
      name: data.name,
      password: data.password,
    });
  }
};

module.exports = { findUsers };
