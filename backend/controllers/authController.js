const { v4: uuid4 } = require('uuid');
const { checkPassword, createUserToken, hashPassword } = require('../core/utils');
const User = require('../models/userModel');


const signUpUser = async (req, res) => {

  try {
    const user = await User.validateThenCreate({ ...req.body });

    const accessToken = createUserToken(user, '10m');
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

  const accessToken = createUserToken(user, '10m');
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

// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// const { v4: uuid4 } = require('uuid');
// const validator = require('validator');
// const { hashPassword } = require('../core/utils');


// const signUpUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     if (!email || !password) {
//       throw Error('Missing fields');
//     }
//     if (!validator.isEmail(email)) {
//       throw Error('Email not valid');
//     }
//     if (!validator.isStrongPassword(password)) {
//       throw Error('Password not strong enough');
//     }

//     const user = await User.create({
//       ...req.body,
//       password: await hashPassword(password),
//       fsUniquifier: uuid4(),
//     });

//     const accessToken = createToken(user._id, user.fsUniquifier, '1h');
//     const refreshToken = createToken(user._id, user.fsUniquifier, '1d');

//     res
//         .status(200)
//         .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
//         .header('Authorization', accessToken)
//         .json({ email: user.email });

//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// }

// const signInUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.signIn(email, password);
//     const accessToken = createToken(user._id, user.fsUniquifier, '1h');
//     const refreshToken = createToken(user._id, user.fsUniquifier, '1d');

//     res
//         .status(200)
//         .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
//         .header('Authorization', accessToken)
//         .json({ email: user.email });

//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// }

// const refreshUserToken = async (req, res) => {
//   const refreshToken = req.cookies['refreshToken'];

//   if (!refreshToken) {
//     return res.status(401).json({ error: 'Refresh token is required' });
//   }

//   try {
//     const { _id, fsUniquifier } = jwt.verify(token, process.env.SECRET);
//     const user = await User.findOne({ _id, fsUniquifier }).select('_id');

//     if (!user) {
//       throw Error();
//     }

//     const accessToken = createToken(user._id, user.fsUniquifier, '1h');

//     res
//         .status(200)
//         .header('Authorization', accessToken)
//         .json({ email: user.email });
  
//   } catch (error) {
//     return res.status(400).json({ error: 'Invalid refresh token' })
//   }
// }


// module.exports = {
//   signUpUser,
//   signInUser,
//   refreshUserToken,
// };
