const { v4: uuid4 } = require('uuid');
const { checkPassword, createUserToken, hashPassword } = require('../core/utils');
const User = require('../models/userModel');


const TOKEN_EXPIRATION = '1d';

const signUpUser = async (req, res) => {

  try {
    const user = await User.validateThenCreate({ ...req.body, roles: ['USERS'] });

    const accessToken = createUserToken(user, TOKEN_EXPIRATION);
    const refreshToken = createUserToken(user, '1d');

    return res
      .status(200)
      .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
      .header('Authorization', accessToken)
      .json({ email: user.email });
  
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const signInUser = async (req, res) => {

  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ error: 'Required fields must be filled' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const match = await checkPassword(password, user.password);
  if (!match) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const accessToken = createUserToken(user, TOKEN_EXPIRATION);
  const refreshToken = createUserToken(user, '1d');

  return res
    .status(200)
    .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
    .header('Authorization', accessToken)
    .json({ email: user.email });
}

const refreshUserToken = async (req, res) => {
  const refreshToken = req.cookies['refreshToken'];

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token required' });
  }

  try {
    const { _id, fsUniquifier } = jwt.verify(refreshToken, process.env.SECRET);
    const user = await User.findOne({ _id, fsUniquifier }, '_id');

    if (!user) {
      throw Error();
    }

    const accessToken = createToken(user._id, user.fsUniquifier, '1h');

    res
        .status(200)
        .header('Authorization', accessToken)
        .json({ email: user.email });
  
  } catch (error) {
    return res.status(400).json({ error: 'Invalid refresh token' })
  }
}


module.exports = {
  refreshUserToken,
  signInUser,
  signUpUser,
};
