import winston from "winston";
import TransportStream from "winston-transport";

test("create new logger with new transport", () => {
  class MyTransport extends TransportStream {
    constructor(option) {
      super(option);
    }

    log(info, next) {
      console.log(
        `${new Date()} : ${info.level.toUpperCase()} : ${info.message}`
      );
      next();
    }
  }

  const logger = winston.createLogger({
    level: "silly",
    transports: [new MyTransport({})],
  });

  logger.error("Hello World Error");
  logger.warn("Hello World Warn");
  logger.info("Hello World Info");
  logger.http("Hello World Http");
  logger.verbose("Hello World Verbose");
  logger.debug("Hello World Debug");
  logger.silly("Hello World Silly");
});
