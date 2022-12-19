import winston from "winston";

test("Logging with format", () => {
  const logger = winston.createLogger({
    level: "info",
    // format: winston.format.json(), // default format
    // format: winston.format.simple(),
    format: winston.format.logstash(),
    transports: [new winston.transports.Console({})],
  });

  logger.info("Hello World");
});

test("Logging with printf format", () => {
  const logger = winston.createLogger({
    level: "info",
    format: winston.format.printf((log) => {
      return `${new Date()} : ${log.level.toUpperCase()}: ${log.message}`;
    }),
    transports: [new winston.transports.Console({})],
  });

  logger.info("Hello World");
  logger.warn("Hello World");
  logger.error("Hello World");
});
