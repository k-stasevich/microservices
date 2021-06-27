import amqp, { Options } from 'amqplib/callback_api';

type ConnectOptions = Options.Connect;

export class RmqService {
  rmqConnection: null | amqp.Connection = null;
  rmqChannel: null | amqp.Channel = null;

  async connect(options: ConnectOptions): Promise<void> {
    try {
      const { err: error0, connection } = await connectWithRetry(options);
      if (error0) throw error0;

      return new Promise((resolve, reject) => {
        connection.createChannel((error1, channel) => {
          if (error1) return reject(error1);

          this.rmqConnection = connection;
          this.rmqChannel = channel;
          resolve();
        });
      });
    } catch (err) {
      throw err;
    }
  }

  get connection(): amqp.Connection {
    return this.rmqConnection as amqp.Connection;
  }

  get channel(): amqp.Channel {
    return this.rmqChannel as amqp.Channel;
  }
}

function connectWithRetry(
  options: ConnectOptions,
  retries = 10
): Promise<{ err: Error; connection: amqp.Connection }> {
  return new Promise((resolve, reject) => {
    amqp.connect(options, async (err, connection) => {
      if (!err) {
        return resolve({ err, connection });
      }

      if (retries !== 0) {
        console.log(`Couldn't connect to rabbitmq, ${retries} retries remaining`);
        setTimeout(() => {
          resolve(connectWithRetry(options, retries - 1));
        }, 3000);
      } else {
        reject(err);
      }
    });
  });
}
