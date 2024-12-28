// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).send('User already exists');

  const user = new User({ email, password });
  await user.save();
  const token = user.generateAuthToken();
  res.status(201).send({ token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid credentials');

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).send('Invalid credentials');

  const token = user.generateAuthToken();
  res.send({ token });
});

module.exports = router;
