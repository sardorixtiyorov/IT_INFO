const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index.routes");
const errorHandler = require("./middleware/error_handing_middleware");
const cookie = require("cookie-parser");
const PORT = config.get("port") || 3030;
const logger = require("./services/logger");
const {
  expressWinstonLogger,
  expressWinstonErrorLoger,
} = require("./middleware/loggerMiddleware");

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
// console.log(process.env.NODE_ENV);
// console.log(process.env.secret);
// console.log(config.get("secret"));
// console.log(config.get("access_key"));

logger.log("info", "Log ma'lumotlar");
logger.error("Error ma'lumotlar");
logger.warn("Warning ma'lumotlar");
logger.debug("Debug ma'lumotlar");
logger.info("Info ma'lumotlar");
// console.trace("Trace ma'lumotlar");
// console.table([1, 2, ["Table", "ma'lumotlar"], ["salim", "karim"], 10, 20]);

const app = express();
// process.on("uncaughtException", (ex) => {
//   console.log("Uncaught Exception: ", ex.message);
//   // process.exit(1);
// });
// process.on("unhandledRejection", (rej) => {
//   console.log("Unhandled Rejection: ", rej);
// });

app.use(express.json()); //Frontdan kelayotgan so'rovni json ga parse qiladi(taniydi)
app.use(cookie()); //Frontdan kelayotgan so'rov ichidagi cookie ni taniydi    //ma'lumotlarni vaqtinchalik saqlash uchun kerak cookie

app.use(expressWinstonLogger);

app.use(mainRouter);

app.use(expressWinstonErrorLoger);

app.use(errorHandler);

async function start() {
  try {
    await mongoose.connect(config.get("dbUri"));
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.log("Could not connect to database");
  }
}
// "smtp_password":"vxvpifhxftafkuna",
start();
