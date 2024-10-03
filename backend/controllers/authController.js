const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const createToken = (_id, fsUniquifier, expiresIn) => {
  return jwt.sign({ _id, fsUniquifier }, process.env.SECRET, { expiresIn });
}

const signUpUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signUp(
      email,
      password,
    )
    const accessToken = createToken(user._id, user.fsUniquifier, '1h');
    const refreshToken = createToken(user._id, user.fsUniquifier, '1d');

    res
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

  try {
    const user = await User.signIn(email, password);
    const accessToken = createToken(user._id, user.fsUniquifier, '1h');
    const refreshToken = createToken(user._id, user.fsUniquifier, '1d');

    res
        .status(200)
        .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
        .header('Authorization', accessToken)
        .json({ email: user.email });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const refreshUserToken = async (req, res) => {
  const refreshToken = req.cookies['refreshToken'];

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token is required' });
  }

  try {
    const { _id, fsUniquifier } = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ _id, fsUniquifier }).select('_id');

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
  signUpUser,
  signInUser,
  refreshUserToken,
};
