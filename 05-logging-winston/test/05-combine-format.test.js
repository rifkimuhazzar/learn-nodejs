import winston from "winston";

test("logging with combine format", () => {
  const logger = winston.createLogger({
    transports: [new winston.transports.Console({})],
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.ms(),
      winston.format.json()
    ),
  });

  logger.error("Hello World");
  logger.warn("Hello World");
  logger.info("Hello World");
});
