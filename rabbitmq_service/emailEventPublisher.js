// emailEventPublisher.js
const amqp = require('amqplib');
const rabbitmq = require('../config/rabbit-mq');
const publishWelcomeEmailEvent = async (userData) => {
  try {
    const connection = await amqp.connect(rabbitmq.rabbitmq);
    const channel = await connection.createChannel();
    const exchange = 'email_events';

    await channel.assertExchange(exchange, 'fanout', { durable: false });
    await channel.publish(exchange, '', Buffer.from(JSON.stringify(userData)));

    console.log('Welcome email event published for user:', userData);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error publishing welcome email event:', error.message);
  }
};

module.exports = { publishWelcomeEmailEvent };
