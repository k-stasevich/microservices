import { Express } from 'express';

/* eslint-disable @typescript-eslint/no-var-requires */
export const registerRoutes = (app: Express): void => {
  app.use('/orders', require('../modules/order').default);
};
