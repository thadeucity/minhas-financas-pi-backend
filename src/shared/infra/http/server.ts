import 'reflect-metadata';

import dotenv from 'dotenv';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';
import 'express-async-errors';

import { routes } from './routes';
import '@shared/infra/typeorm';
import '@shared/container';

const APP_PORT = 3009;

dotenv.config();

const main = async () => {
  const app = express();

  app.use(
    cors({
      origin: 'http://localhost:3000', // TODO - Change to real origin
      optionsSuccessStatus: 200,
    }),
  );

  app.use(express.json());

  app.use(routes);

  app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  });

  app.listen(APP_PORT, () => {
    console.log(`Example app listening on port ${APP_PORT}!`);
  });
};

main();
