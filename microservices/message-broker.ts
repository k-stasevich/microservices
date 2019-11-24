const amqp = require('amqplib/callback_api');

export const MAIN_QUEUE = 'MAIN_QUEUE';

let msgBrokerChannel;

export const initMessageBroker = () => {
  return new Promise(resolve => {
    amqp.connect(process.env.RABBIT_URL, function(error0, connection) {
      if (error0) {
        throw error0;
      }

      connection.createChannel(function(error1, channel) {
        if (error1) throw error1;

        msgBrokerChannel = channel;

        channel.assertQueue(MAIN_QUEUE, {
          durable: false,
        });

        resolve();
      });
    });
  });
};

export const getChannel = () => msgBrokerChannel;
