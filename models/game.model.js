// models/Game.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const userGameSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  gameId: {type: String, required:true},
  playerName: { type: String, required: true },
  score: { type: Number, required: true },
  // Add more fields as needed
});

const gameSchema = new mongoose.Schema({
  gameId:{type:String, default:uuidv4 ,required:true},
  gameName:{type: String, required:true}
})

const GameName = mongoose.model('GameName', gameSchema);
const UserGame = mongoose.model('UserGame', userGameSchema)

module.exports = {GameName, UserGame};
