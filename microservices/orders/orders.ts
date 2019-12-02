import { CookTransaction } from './services/kitchen.service';
import express from 'express';
import axios, { AxiosResponse } from 'axios';
import { initMessageBroker, getChannel, MAIN_QUEUE } from '../message-broker';
import { eventFactory } from './../events';
import bodyParser from 'body-parser';

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

  const promiseAllResult = await Promise.all([
    //
    new CookTransaction(orderId),
    deliverAPI.deliver(orderId).catch(err => ({ error: err })),
  ]);
  const [kitchenResult, deliveryResult] = promiseAllResult;

  if ('error' in kitchenResult || 'error' in deliveryResult) {
    if ('error' in kitchenResult) {
    }

    res.status(400).send({ error: true });
  } else {
    res.send({
      order: { orderId },
      kitchen: kitchenResult.data,
      delivery: deliveryResult.data,
    });
  }
});

const PORT = process.env.PORT || 3000;

initMessageBroker().then(() => {
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
