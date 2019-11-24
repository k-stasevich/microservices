import express from 'express';
import { initMessageBroker } from './../message-broker';

const app = express();

app.get('/', function(req, res) {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

initMessageBroker().then(() => {
  app.listen(PORT, function() {
    console.log(`Orders app listening on port ${PORT}!`);
  });
});
