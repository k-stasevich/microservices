import amqp, { Options } from 'amqplib';
import { sleep } from '../utils';

type ConnectOptions = Options.Connect;

export class RmqService {
  rmqConnection: null | amqp.Connection = null;
  rmqChannel: null | amqp.Channel = null;

  async connect(options: ConnectOptions): Promise<void> {
    const connection = await connectWithRetry(options);
    const channel = await connection.createChannel();
    this.rmqConnection = connection;
    this.rmqChannel = channel;
  }

  get connection(): amqp.Connection {
    return this.rmqConnection as amqp.Connection;
  }

  get channel(): amqp.Channel {
    return this.rmqChannel as amqp.Channel;
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
