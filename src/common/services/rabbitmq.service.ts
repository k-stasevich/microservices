import amqp, { Options } from 'amqplib';
import { sleep } from '../utils';

type ConnectOptions = Options.Connect;

export interface IRmqService {
  connection: amqp.Connection;
  channel: amqp.Channel;
  connect(options: ConnectOptions): Promise<void>;
}

export class RmqService implements IRmqService {
  connection!: amqp.Connection;
  channel!: amqp.Channel;

  async connect(options: ConnectOptions) {
    this.connection = await connectWithRetry(options);
    this.channel = await this.connection.createChannel();
  }
}

async function connectWithRetry(options: ConnectOptions, retries = 10): Promise<amqp.Connection> {
  try {
    return await amqp.connect(options);
  } catch (err) {
    if (retries !== 0) {
      console.log(`Couldn't connect to rabbitmq, ${retries} retries remaining`);
      await sleep(3000);
      return connectWithRetry(options, retries - 1);
    }

    throw err;
  }
}
