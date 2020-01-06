import axios from 'axios';
import express from 'express';
import bodyParser from 'body-parser';

import { connectDB } from './../db-connect';
import { initMessageBroker, getChannel, MAIN_QUEUE } from '../message-broker';

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

  const channel = getChannel();

  channel.consume(
    MAIN_QUEUE,
    msg => {
      console.log(' [x] Received %s', msg.content.toString());
    },
    { noAck: true },
  );
});
