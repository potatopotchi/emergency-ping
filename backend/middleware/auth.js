const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'});
  }

  const token = authorization.split(' ')[1];

  try {
    const { _id, fsUniquifier } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id, fsUniquifier }).select('_id');

    if (!user) {
      throw Error();
    }

    req.user = user;
    next();
  
  } catch (error) {
    res.status(401).json({error: 'Request is not authorized'});
  }
}


module.exports = requireAuth;
