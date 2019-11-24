const amqp = require('amqplib/callback_api');

const MAIN_QUEUE = 'MAIN_QUEUE';

let msgBrokerChannel;

module.exports.MAIN_QUEUE = MAIN_QUEUE;

module.exports.initMessageBroker = () => {
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

module.exports.getChannel = () => msgBrokerChannel;
