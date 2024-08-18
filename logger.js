const { createLogger, transports, format } = require("winston");
const { combine, timestamp, printf, errors, json, colorize } = format;
var { Loggly } = require("winston-loggly-bulk");

const customLevels = {
  levels: {
    critical: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
  },
  colors: {
    critical: "red",
    error: "red",
    warn: "yellow",
    info: "green",
    debug: "blue",
  },
};

const myFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = createLogger({
  levels: customLevels.levels,
  format: combine(timestamp(), errors({ stack: true }), myFormat),
  transports: [
    new transports.File({ filename: "combined.log", level: "debug" }),
    new transports.File({ filename: "errors.log", level: "error" }),
    new transports.File({ filename: "critical.log", level: "critical" }),
    new transports.Console({
      format: combine(colorize(), myFormat),
    }),
    new Loggly({
      token: "1b31e029-a3c9-4556-92ea-08d23a7af9e0",
      subdomain: "gustavo1",
      tags: ["Winston-NodeJS"],
      json: true,
    }),
  ],
});

require("winston").addColors(customLevels.colors);

module.exports = logger;
