import winston from "winston";

const logger = winston.createLogger({
  // level: "info"
  // handleExceptions: true,
  // handleRejections: true,
  transports: [
    new winston.transports.Console({}),
    new winston.transports.File({
      handleExceptions: true,
      handleRejections: true,
      filename: "exception.log",
    }),
  ],
});

async function callAsync() {
  return Promise.reject("Promise ditolak");
}

callAsync();
