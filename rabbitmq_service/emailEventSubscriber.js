// emailEventSubscriber.js
const amqp = require('amqplib');
const rabbitmq = require('../config/rabbit-mq');
const {sendWelcomeEmail} = require('../mail-service/email-service');
const subscribeToWelcomeEmailEvents = async () => {
  try {
    const connection = await amqp.connect(rabbitmq.rabbitmq);
    const channel = await connection.createChannel();
    const exchange = 'email_events';

    await channel.assertExchange(exchange, 'fanout', { durable: false });

    const { queue } = await channel.assertQueue('', { exclusive: true });
    await channel.bindQueue(queue, exchange, '');

    console.log('Waiting for welcome email events. To exit, press CTRL+C');

    channel.consume(queue, (msg) => {
      if (msg.content) {
        const userData = JSON.parse(msg.content.toString());
        sendWelcomeEmail(userData.email, userData.username);
        // sendWelcomeEmail()
      }
    }, { noAck: true });
  } catch (error) {
    console.error('Error subscribing to welcome email events:', error.message);
  }
};


module.exports = { subscribeToWelcomeEmailEvents };
