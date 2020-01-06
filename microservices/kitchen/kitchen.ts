import { ICreateOrderEvent, eventFactory } from './../events';
import express from 'express';
import bodyParser from 'body-parser';

import { connectDB } from './../db-connect';
import { initMessageBroker, getMainChannel, MAIN_QUEUE } from '../message-broker';
import { EVENTS } from '../events';
import { kitchenOrderRepository } from './db/kitchen-order.repository';

const app = express();
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Hello World!');
});

interface ICook {
  orderId: number;
}
const cooks: ICook[] = [];

interface ICookRequest extends express.Request {
  body: {
    orderId: number;
  };
}
app.post('/cook', async (req: ICookRequest, res: express.Response) => {
  const { orderId } = req.body;

  // const newCook: ICook = {
  //   orderId,
  // };
  // cooks.push(newCook);

  // res.send({ success: true });
  res.status(400).send({ error: true });
});

const PORT = process.env.PORT || 3000;
const { DB_URL, DB_NAME } = process.env;

Promise.all([
  //
  initMessageBroker(),
  connectDB(DB_URL as string, DB_NAME as string),
]).then(async db => {
  app.listen(PORT, function() {
    console.log(`Kitchen app listening on port ${PORT}!`);
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

      if (message.event === EVENTS.CREATE_ORDER) {
        const { orderId }: ICreateOrderEvent = message;

        try {
          const created = await kitchenOrderRepository.createKitchenOrder(orderId);

          channel.sendToQueue(
            MAIN_QUEUE,
            Buffer.from(JSON.stringify(eventFactory.cookSuccess(orderId))),
            { persistent: true },
          );
        } catch (err) {
          channel.sendToQueue(
            MAIN_QUEUE,
            Buffer.from(JSON.stringify(eventFactory.cookError(orderId))),
            { persistent: true },
          );
        }
      }
    },
    { noAck: true },
  );
});
