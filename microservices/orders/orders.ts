import express from 'express';
import bodyParser from 'body-parser';

import { MAIN_QUEUE, initMessageBroker, getMainChannel } from './../message-broker';
import { DeliveryAPI } from './../../API/delivery.api';
import { KitchenAPI } from './../../API/kitchen.api';
import { connectDB } from './../db-connect';
import { eventFactory, EVENTS, ICookErrorEvent } from './../events';
import { orderRepository } from './db/order.repository';
import { ORDER_STATUS } from './constants/order-status.constants';

const app = express();
app.use(bodyParser.json());

interface ICreateOrder extends express.Request {
  body: {
    orderId: number;
  };
}
app.post('/order', async (req: ICreateOrder, res) => {
  const { orderId } = req.body;

  const channel = getMainChannel();

  try {
    const result = await orderRepository.createOrder(orderId, ORDER_STATUS.PENDING);

    channel.sendToQueue(
      MAIN_QUEUE,
      Buffer.from(JSON.stringify(eventFactory.createOrder(orderId))),
      { persistent: true },
    );
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
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

  const channel = getMainChannel();

  channel.consume(
    MAIN_QUEUE,
    async msg => {
      if (!msg) {
        return;
      }

      let message;

      try {
        message = JSON.parse(msg.content.toString());
      } catch (err) {
        console.error('JSON parse error');
        console.error('message: ', msg.content.toString());
      }

      console.log('NEW MSG', message);

      if (message.event === EVENTS.COOK_ERROR) {
        const { orderId }: ICookErrorEvent = message;

        try {
          await orderRepository.updateOrder(orderId, ORDER_STATUS.REJECTED);
        } catch (err) {
          console.error('Error updating order to rejected, event', message);
        }
      }
    },
    { noAck: true },
  );
});

const kitchenAPI = new KitchenAPI(process.env.KITCHEN_URL as string);
const deliverAPI = new DeliveryAPI(process.env.DELIVERY_URL as string);
