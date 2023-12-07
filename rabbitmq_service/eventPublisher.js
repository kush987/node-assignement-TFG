// eventPublisher.js
const amqp = require('amqplib');
const rabbitmq = require('../config/rabbit-mq');
const publishUserSignupEvent = async (userData) => {
    console.log(userData,"userDat")
  try {
    const connection = await amqp.connect(rabbitmq.rabbitmq);
    const channel = await connection.createChannel();
    const exchange = 'user_events';

    await channel.assertExchange(exchange, 'fanout', { durable: false });
    await channel.publish(exchange, '', Buffer.from(JSON.stringify(userData)));

    console.log('User signup event published:', userData);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error publishing user signup event:', error.message);
  }
};

module.exports = { publishUserSignupEvent };
