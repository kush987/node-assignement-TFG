// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtsecret = require('../config/jwt-secret');
const { validationResult } = require('express-validator');
const {publishUserSignupEvent} = require('../rabbitmq_service/eventPublisher');
const {publishWelcomeEmailEvent} = require('../rabbitmq_service/emailEventPublisher');
const User = require('../models/user.model');

exports.register = async (req, res) => {
  // Validate request data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  try {
    // Create a new user
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role === null ? 'user' : req.body.role
    });
    
    const userDataForEvent = {
      userId: user.id,
      username: user.username,
      email: user.email,
    };
    
    publishUserSignupEvent(userDataForEvent);

    // Publish welcome email event to RabbitMQ
    publishWelcomeEmailEvent({
      userId: user.id,
      username: user.username,
      email: user.email,
    });

    return res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error });
  }
};

exports.login = async (req, res) => {
  // Validate request data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Find the user by email
  const user = await User.findOne({ where: { email: req.body.email } });

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Compare passwords
  const passwordMatch = await bcrypt.compare(req.body.password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Generate JWT
  const token = jwt.sign({ userId: user.id }, jwtsecret, { expiresIn: '1h' });

  return res.status(200).json({ userId: user.id,token });
};
