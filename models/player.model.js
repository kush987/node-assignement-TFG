// models/Game.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const playerSchema = new mongoose.Schema({
  userId: { type: String, default: uuidv4, required: true },
  playerName: { type: String, required: true },
  // Add more fields as needed
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
