const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const createUserToken = (userData, expiresIn) => {

  const { _id, fsUniquifier } = userData;
  return jwt.sign({ _id, fsUniquifier }, process.env.JWT_SECRET, { expiresIn });
}

const verifyUserToken = (token) => {

  return jwt.verify(token, process.env.JWT_SECRET);
}

const hashPassword = async (password) => {

  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  return password_hash;
}

const checkPassword = async (password, hashedPassword) => {

  return await bcrypt.compare(password, hashedPassword);
}


module.exports = {
  checkPassword,
  createUserToken,
  hashPassword,
  verifyUserToken,
};
