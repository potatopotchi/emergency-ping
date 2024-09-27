const express = require('express');
const User = require('../models/userModel');

const router = express.Router();

router.post('/', async (req, res) => {
  const {username, email, password} = req.body;

  try {
    const user = await User.create({username, email, password});
    res.status(200).json(user);
  
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

router.get('/', (req, res) => {
  res.json({
    message: 'User'
  })
});

module.exports = router;
