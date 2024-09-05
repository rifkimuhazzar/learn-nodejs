import winston from "winston";

test("logging with format specified", () => {
  const logger = winston.createLogger({
    transports: [new winston.transports.Console({})],
    // level: "info", // default level
    // format: winston.format.json(), // default format
    // format: winston.format.simple(),
    format: winston.format.logstash(),
  });

  logger.info("Hello World");
});

test("logging with format printf", () => {
  const logger = winston.createLogger({
    transports: [new winston.transports.Console({})],
    format: winston.format.printf((log) => {
      return `${new Date()} : ${log.level.toUpperCase()} : ${log.message}`;
    }),
  });

  logger.error("Hello World");
  logger.warn("Hello World");
  logger.info("Hello World");
});
