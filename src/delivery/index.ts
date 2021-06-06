import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const { PORT, SERVICE } = process.env;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`${SERVICE} listening at http://localhost:${PORT}`);
});
