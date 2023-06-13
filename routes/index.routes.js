const { Router } = require("express");
const router = Router();

const dictRouter = require("./dictionary.routes");
const categoryRouter = require("./category.routes");
const descRouter = require("./description.routes");
const synonymRouter = require("./synonym.routes");
const authorRouter = require("./author.routes");

router.use("/api/dictionary", dictRouter);
router.use("/api/category", categoryRouter);
router.use("/api/description", descRouter);
router.use("/api/synonym", synonymRouter);
router.use("/api/author", authorRouter);

module.exports = router;
