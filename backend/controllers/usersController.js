const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { v4: uuid4 } = require('uuid');
const validator = require('validator');
const { hashPassword } = require('../core/utils');
const User = require('../models/userModel');


const createUser = async (req, res) => {
  try {
    if (!email || !password) {
      throw Error('Missing fields');
    }
    if (!validator.isEmail(email)) {
      throw Error('Email not valid');
    }
    if (!validator.isStrongPassword(password)) {
      throw Error('Password not strong enough');
    }

    const user = await User.create({
      ...req.body,
      password: await hashPassword(password),
      fsUniquifier: uuid4(),
    });

    res.status(200).json(user);

  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

const getUsers = async (req, res) => {
  const users = await User.find({}).sort({createdAt: -1});
  res.status(200).json(users);
}

const getUser = async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'});
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({error: 'No such user'});
  }

  res.status(200).json(user);
}

const updateUser = async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'});
  }

  const { email, password } = req.body;

  if (email && !validator.isEmail(email)) {
    return res.status(400).json({ error: 'Email is not valid' });
  }

  if (password) {
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: 'Password not strong enough' });
    }

    req.body.password = await hashPassword(password);
  }

  const user = await User.findOneAndUpdate({_id: id}, {
    ...req.body,
    fsUniquifier: uuid4(),
  });

  if (!user) {
    res.status(404).json({error: 'No such user'});
  }

  res.status(200).json(user);
}

const deleteUser = async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'});
  }

  const user = await User.findOneAndDelete({_id: id});

  if (!user) {
    res.status(404).json({error: 'No such user'});
  }

  res.status(200).json(user);
}


module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
