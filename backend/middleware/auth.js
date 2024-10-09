const jwt = require('jsonwebtoken');
const { verifyUserToken } = require('../core/utils');
const User = require('../models/userModel');


const requireAuthentication = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'});
  }

  const token = authorization.split(' ')[1];

  try {
    const { _id, fsUniquifier } = verifyUserToken(token);
    const user = await User.findOne({ _id, fsUniquifier });

    if (!user) {
      throw Error();
    }

    req.user = user;
    next();
  
  } catch (error) {
    res.status(401).json({error: 'Request not authorized'});
  }
}

const authorizeAnyRoles = (...roles) => {

  return async function(req, res, next) {
    try {
      if (!req.user) {
        throw Error();
      
      } else if (!req.user.roles.some((role) => roles.includes(role))) {
        throw Error();
      }

      next();
    
    } catch (error) {
      res.status(401).json({error: 'Request not allowed'});
    }
  };
}


module.exports = {
  authorizeAnyRoles,
  requireAuthentication,
};
