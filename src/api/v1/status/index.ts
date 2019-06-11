import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import statusService from './../../../services/status';
import { path } from './../index';

export default [
  {
    path: `${path}/status`,
    method: 'post',
    handler: [
      async (Req: Request, res: Response, next: NextFunction) => {
        try {
          const statusServiceInstance = Container.get(statusService);
          const apiStatus = await statusServiceInstance.status();
          res.json({ status: apiStatus }).status(200);
        } catch (error) {
          console.log('error detected', error);
          next(error);
        }
      },
    ],
  },
];
