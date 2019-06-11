import { Request, Response, NextFunction, Router } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';

const handle404Error = (router: Router) => {
  router.use((req: Request, res: Response) => {
    const logger: Logger = Container.get('logger');
    logger.error('404', {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      ip: req.ip,
    });
    res.status(404);
    res.api.errors.push({
      field: 'endpoint',
      message: 'API endpoint does not exist',
    });
    res.api.status = 404;
    res.json(res.api);
  });
};

const handleServerError = (router: Router) => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (!err) {
      return next();
    }
    const logger: Logger = Container.get('logger');
    console.log('errThrown', err);

    logger.error('500', {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      ip: req.ip,
      error: err,
      stack: err.stack,
    });

    res.api.errors.push({
      field: 'endpoint',
      message: err.message,
    });
    res.api.status = 500;
    res.status(res.api.status);
    res.json(res.api);
  });
};

export const handleServerStop = (signal: string, server: any) => {
  const logger: Logger = Container.get('logger');

  return () => {
    console.log(`${signal} received! shutting down`);
    logger.info(`${signal}`, {
      method: '',
      url: '',
      query: '',
      ip: '',
      error: `${signal} received`,
      stack: `shutting down`,
    });
    server.close(() => {
      process.exit(0);
    });
  };
};

export const handleServerExit = (signal: string, server: any) => {
  const logger: Logger = Container.get('logger');

  return () => {
    console.log(`${signal} received! shutting down`);
    logger.info(`${signal}`, {
      method: '',
      url: '',
      query: '',
      ip: '',
      error: `${signal} received`,
      stack: `shutting down`,
    });
    server.close(() => {
      process.exit(0);
    });
  };
};

export const handleExceptions = (error: any) => {
  const logger: Logger = Container.get('logger');

  logger.info(`Exception`, {
    method: '',
    url: '',
    query: '',
    ip: '',
    error: error,
    stack: ``,
  });

  process.exit(1);
};
export default [handle404Error, handleServerError];
