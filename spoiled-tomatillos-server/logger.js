const winston = require('winston');

const logDir = 'logs';
const tsFormat = () => (new Date()).toLocaleTimeString();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      timestamp: tsFormat,
      colorize: true,
      level: 'info'
    }),
    new winston.transports.File({
      filename: `${logDir}/system-warning.log`,
      timestamp: tsFormat,
      level: 'warn'
    }),
    new (require('winston-daily-rotate-file'))({
      filename: 'st-%DATE%.log',
      dirname: logDir,
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

module.exports = logger;