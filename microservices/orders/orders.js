const express = require('express');
const { initMessageBroker } = require('./message-broker');
const { ORDER_STATUSES } = require('./order-statuses');

const app = express();

app.post('/order', function(req, res) {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

initMessageBroker().then(() => {
  app.listen(PORT, function() {
    console.log(`Orders app listening on port ${PORT}!`);
  });
});
