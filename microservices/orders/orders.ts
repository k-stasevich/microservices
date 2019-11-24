import express from 'express';
import { initMessageBroker, getChannel, MAIN_QUEUE } from '../message-broker';
import { eventFactory } from './../events';

const app = express();

app.post('/order', function(req, res) {
  const channel = getChannel();

  const orderId = 1;
  channel.sendToQueue(
    MAIN_QUEUE,
    Buffer.from(JSON.stringify(eventFactory.createOrder(orderId))),
  );

  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

initMessageBroker().then(() => {
  app.listen(PORT, function() {
    console.log(`Orders app listening on port ${PORT}!`);
  });
});
