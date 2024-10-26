const mongoose = require('mongoose');

const Calamity = require('../models/calamityModel');
const User = require('../models/userModel');
const UserStatus = require('../models/userStatusModel');
const {
  deriveCreateEndpoint,
  deriveGetManyEndpoint,
  deriveGetOneEndpoint,
  deriveUpdateEndpoint,
  deriveDeleteEndpoint,
} = require('../core/controllers');


const FIELDS_TO_POPULATE = ['locationGroups'];

const createRecord = async (req, res) => {
  try {
    const { locationGroups } = req.body;

    const record = await Calamity.create({ ...req.body });
    if (!record) {
      throw Error('Record not created');
    }

    const affectedUsers = await User.find({
      locationGroup: {'$in': locationGroups},
    });

    for (const user of affectedUsers) {
      const userStatus = await UserStatus.create({
        user: user._id,
        calamity: record._id,
      });

      if (!userStatus) {
        continue;
      }

      user.recentStatus = userStatus._id;
      await user.save();

      await UserStatus.updateMany(
        {
          user: user._id,
          status: 'PENDING',
          _id: { '$ne': userStatus._id }
        },
        { status: 'EXPIRED' },
      );
    }

    return res.status(200).json(record);

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const getRecords = deriveGetManyEndpoint(Calamity, FIELDS_TO_POPULATE);
const getRecord = deriveGetOneEndpoint(Calamity, FIELDS_TO_POPULATE);
const updateRecord = deriveUpdateEndpoint(Calamity, FIELDS_TO_POPULATE);
const deleteRecord = deriveDeleteEndpoint(Calamity, FIELDS_TO_POPULATE);


module.exports = {
  createRecord,
  deleteRecord,
  getRecord,
  getRecords,
  updateRecord,
};
