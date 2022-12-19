import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  // handleExceptions: true,
  // handleRejections: true,
  transports: [
    new winston.transports.Console({}),
    new winston.transports.File({
      handleExceptions: true,
      handleRejections: true,
      filename: "src/11-rejection.log",
    }),
  ],
});

async function callAsync() {
  return Promise.reject("Ups");
}

callAsync();
