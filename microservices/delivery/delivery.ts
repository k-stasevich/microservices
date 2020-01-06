import { connectDB } from './../db-connect';
import express from 'express';
import { initMessageBroker } from './../message-broker';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Hello World!');
});

interface IDeliverRequest extends express.Request {}
app.post('/deliver', async (req: IDeliverRequest, res) => {
  res.status(400).send({ error: true });
  // res.send({ success: true });
});

const PORT = process.env.PORT || 3000;
const { DB_URL, DB_NAME } = process.env;

Promise.all([
  //
  initMessageBroker(),
  connectDB(DB_URL as string, DB_NAME as string),
]).then(async db => {
  app.listen(PORT, function() {
    console.log(`Delivery app listening on port ${PORT}!`);
  });
});
