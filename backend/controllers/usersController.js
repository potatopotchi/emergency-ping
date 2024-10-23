const mongoose = require('mongoose');

const User = require('../models/userModel');


const FIELDS_TO_POPULATE = ['locationGroup', 'recentStatus'];

const createUser = async (req, res) => {

  try {
    const user = await User
      .validateThenCreate({ ...req.body })
      .populate(FIELDS_TO_POPULATE);
      
    return user.toObject();
  
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const getUsers = async (req, res) => {

  const users = await User
    .find({}, '-__v -password -fsUniquifier')
    .sort({createdAt: -1})
    .populate(FIELDS_TO_POPULATE);

  return res.status(200).json(users);
}

const getEmployeeLocations = async (req, res) => {
  const users = await User.find({}).sort({createdAt: -1});
  res.status(200).json(users);
}

const getUser = async (req, res) => {

  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'});
  }

  // Check for item level permission.
  if (
    req.user._id != id
    && !req.user.roles.some((role) => ['SUPERUSER'].includes(role))
  ) {
    return res.status(403).json({ error: 'Request not allowed' });
  }

  const user = await User
    .findById(id)
    .populate(FIELDS_TO_POPULATE);

  if (!user) {
    return res.status(404).json({error: 'No such user'});
  }

  return res.status(200).json(user.toObject());
}

const updateUser = async (req, res) => {

  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'});
  }

  // Check for item level permission.
  if (
    req.user._id != id
    && !req.user.roles.some((role) => ['SUPERUSER'].includes(role))
  ) {
    return res.status(403).json({ error: 'Request not allowed' });
  }

  let user = await User
    .findById(id)
    .populate(FIELDS_TO_POPULATE);

  if (!user) {
    return res.status(404).json({error: 'No such user'});
  }

  try {
    user = await User.validateOneThenUpdate({ _id: id }, { ...req.body });
    return res.status(200).json(user.toObject());
  
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const deleteUser = async (req, res) => {
  
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'});
  }

  const user = await User
    .findByIdAndDelete(id)
    .populate(FIELDS_TO_POPULATE);

  if (!user) {
    return res.status(404).json({ error: 'No such user' });
  }

  return res.status(200).json(user.toObject());
}
  

module.exports = {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  getEmployeeLocations,
  updateUser,
}
