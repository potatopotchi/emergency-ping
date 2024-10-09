const mongoose = require('mongoose');
const validator = require('validator');
const { v4: uuid4 } = require('uuid');
const { checkPassword, hashPassword } = require('../core/utils');


const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fsUniquifier: {
    type: String,
    required: true,
    default: uuid4,
  },
  roles: [{
    type: String,
    enum: ['superuser', 'admin', 'user'],
  }],
}, { timestamps: true });

if (!userSchema.options.toObject) userSchema.options.toObject = {};
userSchema.options.toObject.transform = function (doc, ret, options) {

  delete ret.__v;
  delete ret.password;
  delete ret.fsUniquifier;

  return ret;
}

userSchema.statics.validateThenCreate = async function(userData) {

  const { email, password } = userData;

  if (email && !validator.isEmail(email)) {
    throw Error('Email not valid');
  }

  if (password) {
    if (!validator.isStrongPassword(password)) {
      throw Error('Password not strong enough');
    }

    userData.password = await hashPassword(password);
    userData.fsUniquifier = uuid4();
  }

  const user = await this.create({
    ...userData,
    roles: ['user'],
  });
  if (!user) {
    throw Error('User not created');
  }

  return user;
}

userSchema.statics.validateOneThenUpdate = async function(conditions, userData) {

  const { password, oldPassword } = userData;

  let user = await this.findOne({ ...conditions });
  if (!user) {
    throw Error('User not updated');
  }

  if (password) {
    if (!oldPassword) {
      throw Error('Old password is required when changing password');
    }

    const match = await checkPassword(oldPassword, user.password);
    if (!match) {
      throw Error('Invalid old password');
    }

    if (!validator.isStrongPassword(password)) {
      throw Error('Password not strong enough');
    }

    userData.password = await hashPassword(password);
    userData.fsUniquifier = uuid4();
  }

  user = await this.findOneAndUpdate({ ...conditions }, { ...userData });
  if (!user) {
    throw Error('User not updated');
  }

  return user;
}


module.exports = mongoose.model('User', userSchema);
