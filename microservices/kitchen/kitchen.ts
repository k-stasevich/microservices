import axios from 'axios';
import express from 'express';
import { initMessageBroker, getChannel, MAIN_QUEUE } from '../message-broker';
import bodyParser from 'body-parser';

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
initMessageBroker().then(() => {
  app.listen(PORT, function() {
    console.log(`Orders app listening on port ${PORT}!`);
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
