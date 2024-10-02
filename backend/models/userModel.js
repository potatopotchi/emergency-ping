const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validator = require('validator');

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
  }
}, { timestamps: true });


userSchema.statics.signUp = async function(email, password) {
  if (!(email && password)) {
    throw Error('All fields must be filled');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough');
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: password_hash,
  });

  return user;
}

userSchema.statics.signIn = async function(email, password) {
  if (!(email && password)) {
    throw Error('All fields must be filled');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error('Invalid credentials');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Invalid credentials');
  }

  return user;
}

userSchema.hasAnyRoles = async function(...roles) {
  // Preparation for roles.
}

userSchema.hasAllRoles = async function(...roles) {
  // Preparation for roles.
}


module.exports = mongoose.model('User', userSchema);
