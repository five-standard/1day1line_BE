const Diaries = require("./Diaries");
const OAuth = require("./OAuth");
const Books = require("./Books");
const Share = require("./Share");
const router = require("express")();

router.use("/diary", Diaries);
router.use("/auth", OAuth);
router.use("/book", Books);
router.use("/share", Share);

module.exports = router;
