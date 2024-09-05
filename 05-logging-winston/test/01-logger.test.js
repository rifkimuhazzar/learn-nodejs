import winston from "winston";

test("create new logger", () => {
  const logger = winston.createLogger({}); // tidak bisa tanpa transport

  logger.log({
    level: "info",
    message: "Hello World",
  });
});
