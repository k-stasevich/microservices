// импортируем класс Gateway из раннее установленного пакета micromq
const Gateway = require('micromq/gateway');

const MICROSERVICES = {
  KITCHEN: 'kitchen',
  DELIVERY: 'delivery',
  PAYMENT: 'payment',
};

// создаем экземпляр класса Gateway
const app = new Gateway({
  // названия микросервисов, к которым мы будем обращаться
  microservices: Object.values(MICROSERVICES),
  // настройки rabbitmq
  rabbit: {
    // ссылка для подключения к rabbitmq (default: amqp://guest:guest@localhost:5672)
    url: process.env.RABBIT_URL,
  },
});

// создаем два эндпоинта /friends & /status на метод GET
app.get(['/orders'], async (req, res) => {
  // делегируем запрос в микросервис payment
  await res.delegate(MICROSERVICES.PAYMENT);
});

const PORT = process.env.PORT || 3000;
// начинаем слушать порт
app.listen(PORT).then(() => {
  console.log(`Gateway app listening on port ${PORT}!`);
});
