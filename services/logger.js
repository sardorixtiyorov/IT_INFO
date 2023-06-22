const config = require("config");
const { createLogger, format, transports, exceptions } = require("winston");
const { combine, timestamp, printf, prettyPrint, json, colorize } = format;
require("winston-mongodb");
// require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp}  ${level}: ${message}`;
});

if (process.env.NODE_ENV == "production") {
  const logger = createLogger({
    format: combine(timestamp(), myFormat),
    transports: [
      new transports.Console({ level: "debug" }),
      new transports.File({ filename: "log/error.log", level: "error" }),
      new transports.File({ filename: "log/combine.log", level: "info" }),
    ],
  });
  module.exports = logger;
} else  {
  const logger = createLogger({
    transports: [
      new transports.File({ filename: "log/error.log", level: "error" }),
      new transports.MongoDB({
        db: config.get("dbUri"),
        options: {
          useUnifiedTopology: true,
        },
      }),
    ],
  });
  module.exports = logger;
}

// logger.exceptions.handle(
//   new transports.File({
//     filename: "log/exceptions.log",
//     handleExceptions: true,
//   })
// );
// logger.rejections.handle(
//   new transports.File({
//     filename: "log/exceptions.log",
//     handleRejections: true,
//   })
// );

// logger.exitOnError = false;
