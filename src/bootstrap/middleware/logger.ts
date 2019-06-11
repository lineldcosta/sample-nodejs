import { Router, Request, Response, NextFunction } from 'express';
import { createLogger, transports, format } from 'winston';
import { ILog } from './../../interfaces/ILog';

import config from './../../cfg';

const MESSAGE = Symbol.for('message');

const jsonFormatter = logEntry => {
  const base = { timestamp: new Date() };
  const json = Object.assign(base, logEntry);
  logEntry[MESSAGE] = JSON.stringify(json);
  return logEntry;
};

export const logger = createLogger({
  level: 'info',
  format: format(jsonFormatter)(),
  transports: [
    new transports.File({
      filename: 'debug.log',
      level: 'debug',
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
});

export const HandleLogger = (router: Router) => {
  if (!config.logs.logRequestsEnabled) {
    logger.debug('Request logging not activated');
  }

  router.use((req: Request, res: Response, next: NextFunction) => {
    req.logData = {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      body: req.body,
      // reqid: ++count,
      ip: req.ip,
    };

    logger.info('request', req.logData);
    next();
  });
};
