// eventSubscriber.js
const amqp = require('amqplib');
const rabbitmq = require('../config/rabbit-mq');
const subscribeToUserSignupEvents = async () => {
  try {
    const connection = await amqp.connect(rabbitmq.rabbitmq);
    const channel = await connection.createChannel();
    const exchange = 'user_events';

    await channel.assertExchange(exchange, 'fanout', { durable: false });

    const { queue } = await channel.assertQueue('', { exclusive: true });
    await channel.bindQueue(queue, exchange, '');

    console.log('Waiting for user signup events. To exit, press CTRL+C');

    channel.consume(queue, (msg) => {
      if (msg.content) {
        const userData = JSON.parse(msg.content.toString());
        processUserSignupEvent(userData);
      }
    }, { noAck: true });
  } catch (error) {
    console.error('Error subscribing to user signup events:', error.message);
  }
};

const processUserSignupEvent = (userData) => {
  // Implement your logic to process user signup events
  console.log('Processing user signup event:', userData);
  // Add your business logic here
};

module.exports = { subscribeToUserSignupEvents };
