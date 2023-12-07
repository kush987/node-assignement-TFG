// app.js
const express = require('express');
const sequelize = require('./config/sql-db');
const { connectDB }= require('./config/mongo-db');
const { subscribeToUserSignupEvents } = require('./rabbitmq_service/eventSubscriber');
const { subscribeToWelcomeEmailEvents } = require('./rabbitmq_service/emailEventSubscriber');
const authRoutes = require('./routes/user.routes');
const gameRoutes = require('./routes/game.routes');
const playerRoutes = require('./routes/player.routes');
const app = express();

app.use(express.json());
connectDB();

subscribeToUserSignupEvents();
subscribeToWelcomeEmailEvents();
// app.use('')
// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/game', gameRoutes);
app.use('/api/v1/player', playerRoutes);
// Sync database and start the server
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
});
