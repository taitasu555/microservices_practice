import * as log4js from "log4js";

log4js.configure({
  //  type console and file
  appenders: {
    console: {
      type: "console",
      layout: {
        type: "pattern",
        pattern: "%[%d{yyyy-MM-dd hh:mm:ss} %p %c -%] %m",
      },
    },
    file: {
      type: "file",
      filename: "logs/log.log",
      maxLogSize: 10485760,
      backups: 3,
      compress: true,
      layout: {
        type: "pattern",
        pattern: "%[%d{yyyy-MM-dd hh:mm:ss} %p %c -%] %m",
      },
    },
  },
  categories: {
    default: {
      appenders: ["console", "file"],
      level: "debug",
    },
  },
});
const logger = log4js.getLogger();
export default logger;
