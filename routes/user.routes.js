// routes/authRoutes.js
const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post(
    '/register',
    [
        body('username').trim().notEmpty(),
        body('email').trim().isEmail(),
        body('password').trim().isLength({ min: 6 }),
    ],
    authController.register
);

router.post(
    '/login',
    [
        body('email').trim().isEmail(),
        body('password').trim().isLength({ min: 6 }),
    ],
    authController.login
);

module.exports = router;
