const express = require('express');
const playerController = require('../controllers/player.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

// router.post('/create', authMiddleware,gameController.)
router.post('/create', authMiddleware,playerController.createPlayer);
router.get('/:userId?', authMiddleware, playerController.getPlayerData);
// router.get('/all-players', authMiddleware, playerController.getPlayerAll);
router.put('/:userId/update', authMiddleware,playerController.updatePlayerData);
router.delete('/:userId/:playerName/delete',authMiddleware, playerController.deletePlayer);

module.exports = router;