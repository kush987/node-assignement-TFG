// controllers/gameController.js
const {GameName, UserGame} = require('../models/game.model');
// const Player = require('../models/player.model');
exports.assignUserGame = async (req, res) => {
  try {
    const { userId, gameId, playerName, score } = req.body;
    const game = new UserGame({ userId, gameId,playerName, score });
    await game.save();
    res.status(201).json({ message: 'Game entry created successfully', game });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createGame = async (req, res) => {
  try {
    const { gameId, gameName} = req.body;
    const game = new GameName({ gameId, gameName});
    await game.save();
    res.status(201).json({ message: 'Game entry created successfully', game });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getGame = async (req, res) => {
  try {
    const games = await GameName.find();
    res.status(200).json({ games });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.userByGame = async (req, res) => {
  try {
    id = await req.params.gameId
    const users = await UserGame.find({gameId:id});
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getUserGame = async (req, res) => {
  try {
    const games = await UserGame.find();
    res.status(200).json({ games });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUserGameData = async (req, res) => {
  try {
    const userId = req.params.userId;
    const games = await UserGame.find({ userId });
    res.status(200).json({ games });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateUserGameData = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { playerName, score } = req.body;
    const game = await UserGame.findOneAndUpdate({ userId:userId}, {playerName: playerName , score: score}, { new: true });
    res.status(200).json({ message: 'Game entry updated successfully', game });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteUserGame = async (req, res) => {
  try {
    const userId = req.params.userId;
    const playerName = req.params.playerName;
    await UserGame.findOneAndDelete({ userId, playerName });
    res.status(200).json({ message: 'Game entry deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
