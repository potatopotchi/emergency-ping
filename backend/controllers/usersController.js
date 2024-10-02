const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/userModel');


const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'});
}

const createUser = async (req, res) => {
  try {
    const user = await User.create({...req.body});
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

  const user = await User.findOneAndUpdate({_id: id}, {
    ...req.body
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

const signUpUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signUp(
      email,
      password,
    )
    const token = createToken(user._id);

    res.status(200).json({email, token});

  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signIn(email, password);
    const token = createToken(user._id);

    res.status(200).json({email, token});

  } catch (error) {
    res.status(400).json({error: error.message});
  }
}


module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  signUpUser,
  signInUser,
};
