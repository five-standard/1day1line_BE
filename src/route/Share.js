const { book } = require("../../models");
const { checkPassword } = require("../controllers/Share");
const router = require("express")();

router.post("/check", checkPassword);

module.exports = router;
