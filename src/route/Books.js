const { findUsers } = require("../controllers/Books");
const router = require("express")();

router.get("/find", findUsers);

module.exports = router;
