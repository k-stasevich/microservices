import express from 'express';
import axios, { AxiosResponse } from 'axios';
import bodyParser from 'body-parser';

import { connectDB } from './../db-connect';
import { CookTransaction } from './services/cook.transaction';
import { initMessageBroker, getChannel } from '../message-broker';
import { eventFactory } from './../events';

const app = express();
app.use(bodyParser.json());

interface IOrder {
  id: number;
}

const orders: IOrder[] = [];

interface ICreateOrder extends express.Request {}
app.post('/order', async (req: ICreateOrder, res) => {
  const channel = getChannel();

  const orderId = 1;
  const newOrder = { id: orders.length };
  orders.push(newOrder);

  // channel.sendToQueue(
  //   MAIN_QUEUE,
  //   Buffer.from(JSON.stringify(eventFactory.createOrder(orderId))),
  // );
});

const PORT = process.env.PORT || 3000;
const { DB_URL, DB_NAME } = process.env;

Promise.all([
  //
  initMessageBroker(),
  connectDB(DB_URL as string, DB_NAME as string),
]).then(async db => {
  app.listen(PORT, function() {
    console.log(`Orders app listening on port ${PORT}!`);
  });
});

const kitchenAPI = {
  async cook(orderId: number) {
    const url = `${process.env.KITCHEN_URL}/cook`;
    return axios.post(url, { orderId });
  },
};

const deliverAPI = {
  async deliver(orderId: number) {
    const url = `${process.env.DELIVERY_URL}/deliver`;
    return axios.post(url, { orderId });
  },
};
