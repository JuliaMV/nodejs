import winston from 'winston';
import path from 'path';

const errorLog = path.join(__dirname, '../logs/error.log');
const infoLog = path.join(__dirname, '../logs/combined.log');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: errorLog, level: 'error' }),
    new winston.transports.File({ filename: infoLog }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default logger;
