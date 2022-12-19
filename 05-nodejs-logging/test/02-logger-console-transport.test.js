import winston from "winston";

test("create new logger with console transport", () => {
  // saat membuat logger minimal harus ada 1 transport
  const logger = winston.createLogger({
    transports: [new winston.transports.Console({})],
  });

  logger.log({ level: "info", message: "Hello Logging" });
});
