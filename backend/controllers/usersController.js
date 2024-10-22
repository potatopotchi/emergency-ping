const axios = require('axios');
const mongoose = require('mongoose');

const User = require('../models/userModel');
const regionCoordinates = require('../models/region-coordinates.json'); 


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
