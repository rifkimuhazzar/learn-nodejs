import winston from "winston";

test("create new logger with console & file transport", () => {
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({}),
      new winston.transports.File({ filename: "application.log" }),
      new winston.transports.File({
        filename: "application-error.log",
        level: "error",
      }),
    ],
  });

  logger.error("Hello World 1");
  logger.warn("Hello World 2");
  logger.info("Hello World 3");

  logger.http("Hello World 4");
  logger.verbose("Hello World 5");
});
