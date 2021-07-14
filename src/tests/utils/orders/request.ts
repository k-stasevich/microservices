import express from 'express';
import supertestRequest from 'supertest';
import startServer from '../../../orders/server';

let app!: express.Express;

export const initServer = async () => {
  app = await startServer();
};

export const request = () => supertestRequest(app);
