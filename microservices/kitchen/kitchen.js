const express = require('express');
const { initMessageBroker, getChannel, MAIN_QUEUE } = require('../message-broker');

const app = express();

app.get('/', function(req, res) {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
initMessageBroker().then(() => {
  app.listen(PORT, function() {
    console.log(`Orders app listening on port ${PORT}!`);
  });

  const channel = getChannel();

  channel.consume(
    MAIN_QUEUE,
    function(msg) {
      console.log(' [x] Received %s', msg.content.toString());
    },
    {
      noAck: true,
    },
  );
});
