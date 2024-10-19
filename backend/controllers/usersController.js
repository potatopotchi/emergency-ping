const { v4: uuid4 } = require('uuid');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const { hashPassword } = require('../core/utils');

const axios = require('axios');
const regionCoordinates = require('../models/region-coordinates.json'); 

// const createUser = async (req, res) => {

//   const { valid, error } = await User.validateCreate({ ...req.body });
//   if (!valid) {
//     return res.status(400).json({ error: error.message });
//   }

//   const { password } = req.body;
//   const user = await User.create({
//     ...req.body,
//     password: await hashPassword(password),
//     fsUniquifier: uuid4(),
//   });

//   return res
//     .status(200)
//     .json(user.toObject());
// }

// const getUsers = async (req, res) => {

//   const users = await User
//     .find({}, '-__v -password -fsUniquifier')
//     .sort({createdAt: -1});

//   return res.status(200).json(users);
// }

// const getUser = async (req, res) => {

//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({error: 'No such user'});
//   }

//   const user = await User.findById(id, '-__v -password -fsUniquifier');
//   if (!user) {
//     return res.status(404).json({error: 'No such user'});
//   }

//   return res.status(200).json(user);
// }

// const updateUser = async (req, res) => {

//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({error: 'No such user'});
//   }

//   const { valid, error } = User.validateUpdate({ ...req.body });
//   if (!valid) {
//     return res.status(400).json({ error: error.message });
//   }

//   const { password } = req.body;
//   if (password) {
//     req.body.password = hashPassword(password);
//     req.body.fsUniquifier = uuid4();
//   }

//   const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });
//   if (!user) {
//     res.status(404).json({error: 'No such user'});
//   }

//   res.status(200).json(user.toObject());
// }

// const deleteUser = async (req, res) => {
  
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({error: 'No such user'});
//   }

//   const user = await User.findByIdAndDelete(id);
//   if (!user) {
//     return res.status(404).json({ error: 'No such user' });
//   }

//   return res.status(200).json(user.toObject());
// }

const createUser = async (req, res) => {

  try {
    const user = await User.validateThenCreate({ ...req.body });
    return user.toObject();
  
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const getUsers = async (req, res) => {

  const users = await User
    .find({}, '-__v -password -fsUniquifier')
    .sort({createdAt: -1});

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

  if (req.user._id != id) {
    return res.status(403).json({ error: 'Request not allowed' });
  }

  const user = await User.findById(id);
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

  if (req.user._id != id) {
    return res.status(403).json({ error: 'Request not allowed' });
  }

  let user = await User.findById(id);
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
  
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'No such user' });
    }
  
    return res.status(200).json(user.toObject());
  }

  const getNearestPlaces = async (req, res) => {
    try {
      const { amenity } = req.query;  // Use req.query to get query parameters
      const employeeLocation = req.locationCode;  // Make sure this is set in your request middleware
  
      // If using static mapping, look up the coordinates
      const coordinates = regionCoordinates[employeeLocation];
  
      if (!coordinates) {
        return res.status(400).json({ success: false, message: 'Invalid location code' });
      }
  
      // Split the comma-separated amenities into an array
      const amenities = amenity.split(',');
  
      let allPlaces = [];
  
      // Loop through the amenities and fetch 7 places per amenity
      for (let a of amenities) {
        const endpoint = `https://nominatim.openstreetmap.org/search`;
        const params = {
          format: 'json',
          q: a,                // Query each amenity (e.g., 'mall', 'cafe', 'restaurant')
          lat: coordinates.latitude,
          lon: coordinates.longitude,
          radius: 5000,        // 5km radius
          limit: 7             // Limit to 7 results per amenity
        };
  
        const response = await axios.get(endpoint, { params });
        allPlaces = [...allPlaces, ...response.data];  // Combine results for all amenities
      }
  
      // Send combined result back
      res.status(200).json({ success: true, data: allPlaces });
    } catch (error) {
      console.error('Error fetching places:', error.message);
      res.status(500).json({ success: false, message: 'Error fetching nearby places' });
    }
  };
  

module.exports = {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  getEmployeeLocations,
  updateUser,
  getNearestPlaces
}

// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const { v4: uuid4 } = require('uuid');
// const validator = require('validator');
// const { hashPassword } = require('../core/utils');
// const User = require('../models/userModel');


// const createUser = async (req, res) => {
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

//     res.status(200).json(user);

//   } catch (error) {
//     res.status(400).json({error: error.message});
//   }
// }

// const getUsers = async (req, res) => {
//   const users = await User.find({}).sort({createdAt: -1});
//   res.status(200).json(users);
// }

// const getUser = async (req, res) => {
//   const { id } = req.params;
  
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({error: 'No such user'});
//   }

//   const user = await User.findById(id);

//   if (!user) {
//     return res.status(404).json({error: 'No such user'});
//   }

//   res.status(200).json(user);
// }

// const updateUser = async (req, res) => {
//   const { id } = req.params;
  
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({error: 'No such user'});
//   }

//   const { email, password } = req.body;

//   if (email && !validator.isEmail(email)) {
//     return res.status(400).json({ error: 'Email is not valid' });
//   }

//   if (password) {
//     if (!validator.isStrongPassword(password)) {
//       return res.status(400).json({ error: 'Password not strong enough' });
//     }

//     req.body.password = await hashPassword(password);
//   }

//   const user = await User.findOneAndUpdate({_id: id}, {
//     ...req.body,
//     fsUniquifier: uuid4(),
//   });

//   if (!user) {
//     res.status(404).json({error: 'No such user'});
//   }

//   res.status(200).json(user);
// }

// const deleteUser = async (req, res) => {
//   const { id } = req.params;
  
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({error: 'No such user'});
//   }

//   const user = await User.findOneAndDelete({_id: id});

//   if (!user) {
//     res.status(404).json({error: 'No such user'});
//   }

//   res.status(200).json(user);
// }


// module.exports = {
//   createUser,
//   getUsers,
//   getUser,
//   updateUser,
//   deleteUser,
// };
