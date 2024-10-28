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
    }

    return res.status(200).json(record);

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const getRecords = deriveGetManyEndpoint(Calamity);
const getRecord = deriveGetOneEndpoint(Calamity);

const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { fpop, select } = req.query;
    const { isActive } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such record'});
    }

    const exist = await Calamity.findById(id).lean();
    if (!exist) {
      return res.status(404).json({ error: 'No such record'});
    }

    const record = await Calamity
      .findOneAndUpdate(
        { _id: id },
        { ...req.body },
      )
      .populate(fpop)
      .select(select)
      .lean();

    if (!record) {
      return res.status(400).json({ error: 'Record not updated'});
    }

    // Expire all user status related to this calamity.
    if (!isActive) {
      await UserStatus.updateMany(
        {
          calamity: record._id,
          status: 'PENDING',
        },
        {
          '$set': { status: 'EXPIRED' },
        },
      )
    }

    return res.status(200).json(record);
  
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const deleteRecord = deriveDeleteEndpoint(Calamity);


module.exports = {
  createRecord,
  deleteRecord,
  getRecord,
  getRecords,
  updateRecord,
};
