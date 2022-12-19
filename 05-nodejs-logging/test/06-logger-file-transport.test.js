import winston from "winston";

test("logger with console and file transport", () => {
  // saat membuat logger minimal harus ada 1 transport
  const logger = winston.createLogger({
    level: "info",
    transports: [
      new winston.transports.Console({}),
      new winston.transports.File({
        filename: "06-application1.log",
      }),
      new winston.transports.File({
        filename: "06-application2.log",
      }),
    ],
  });

  logger.info("Hello World");
  logger.info("Hello World");
  logger.info("Hello World");
});
