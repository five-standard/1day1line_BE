const { book } = require("../../models");

const checkPassword = async (req, res) => {
  const { password } = req.body;
  const { uuid } = req.headers;

  const datas = await book.findOne({ where: { uuid: uuid } });

  if (datas.password === password) {
    return res.status(200).json(true);
  } else {
    return res.status(401).json(false);
  }
};

module.exports = { checkPassword };
