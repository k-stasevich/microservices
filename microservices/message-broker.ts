import amqp, { Channel } from 'amqplib/callback_api';

export const MAIN_QUEUE = 'MAIN_QUEUE';

let mainChannel: Channel;

export const initMessageBroker = () => {
  return new Promise((resolve, reject) => {
    amqp.connect(process.env.RABBIT_URL as string, function(error0, connection) {
      if (error0) {
        return reject(error0);
      }

      connection.createChannel((error1, channel: Channel) => {
        if (error1) return reject(error1);

        mainChannel = channel;

        channel.assertQueue(MAIN_QUEUE, {
          durable: false,
        });

        resolve();
      });
    });
  });
};

export const getMainChannel = () => mainChannel;
