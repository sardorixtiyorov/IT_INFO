const { Router } = require("express");
const express = require("express");

const dictRouter = require("./dictionary.routes");
const categoryRouter = require("./category.routes");
const descRouter = require("./description.routes");
const synonymRouter = require("./synonym.routes");
const authorRouter = require("./author.routes");
const adminRouter = require("./admin.routes");
const userRouter = require("./user.routes");

express.Router.prefix = function (path, subRouter) {
  const router = express.Router();
  this.use(path, router);
  subRouter(router);
  return router;
};

const router = Router();

router.prefix("/api", (ApiRouter) => {
  ApiRouter.use("/dictionary", dictRouter);
  ApiRouter.use("/category", categoryRouter);
  ApiRouter.use("/description", descRouter);
  ApiRouter.use("/synonym", synonymRouter);
  ApiRouter.use("/author", authorRouter);
  ApiRouter.use("/admin", adminRouter);
  ApiRouter.use("/user", userRouter);
});

module.exports = router;
