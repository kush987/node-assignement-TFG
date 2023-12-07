// routes/gameRoutes.js
const express = require('express');
const gameController = require('../controllers/game.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

// router.post('/create', authMiddleware,gameController.)
router.post('/createGame', authMiddleware,gameController.createGame);
router.get('/games',authMiddleware,gameController.getGame);
router.get('/getuserBygame/:gameId',authMiddleware,gameController.userByGame)
router.post('/assignUserGame', authMiddleware,gameController.assignUserGame);
router.get('/:userId', authMiddleware,gameController.getUserGameData);
router.put('/:userId/update', authMiddleware,gameController.updateUserGameData);
router.delete('/:userId/:playerName/delete',authMiddleware, gameController.deleteUserGame);

module.exports = router;
