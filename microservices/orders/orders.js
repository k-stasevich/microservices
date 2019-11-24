const express = require('express');
const { initMessageBroker, getChannel, MAIN_QUEUE } = require('../message-broker');
const { createCreateOrder } = require('../events');
const { ORDER_STATUSES } = require('./order-statuses');

const app = express();

app.post('/order', function(req, res) {
  const channel = getChannel();

  const orderId = 1;
  channel.sendToQueue(
    MAIN_QUEUE,
    Buffer.from(JSON.stringify(createCreateOrder(orderId))),
  );

  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

initMessageBroker().then(() => {
  app.listen(PORT, function() {
    console.log(`Orders app listening on port ${PORT}!`);
  });
});
