// controllers/gameController.js
const Player = require('../models/player.model');
const {UserGame} = require('../models/game.model');
exports.createPlayer = async (req, res) => {
    try {
        const { userId, playerName } = req.body;
        const player = new Player({ userId, playerName });
        await player.save();
        res.status(201).json({ message: 'Player created successfully', player });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getPlayerData = async (req, res) => {
    try {
        let query = {}; // Initialize an empty query object

        // Check if userId is provided in params
        if (req.params.userId) {
            query.userId = req.params.userId; // Set the query to fetch data for the specific user
        }

        const players = await Player.find(query);

        res.status(200).json({ players });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.updatePlayerData = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { playerName} = req.body;
        console.log(userId)
        console.log(playerName)
        const player = await Player.findOneAndUpdate({ userId:userId}, {playerName:playerName }, { new: true });
        console.log(player)
        res.status(200).json({ message: 'Player updated successfully', player });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deletePlayer = async (req, res) => {
    try {
        const userId = req.params.userId;
        const playerName = req.params.playerName;
        await Player.findOneAndDelete({ userId, playerName });
        await UserGame.findOneAndDelete({userId});
        res.status(200).json({ message: 'Player deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
