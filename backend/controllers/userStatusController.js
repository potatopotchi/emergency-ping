const User = require('../models/userModel');
const UserStatus = require('../models/userStatusModel');
const {
  deriveGetManyEndpoint,
  deriveGetOneEndpoint,
  deriveUpdateEndpoint,
  deriveDeleteEndpoint,
} = require('../core/controllers');


const FIELDS_TO_POPULATE = ['user', 'calamity'];

const createRecord = async (req, res) => {
  try {
    const record = await UserStatus.create({...req.body});
    if (!record) {
      throw Error('Record not created');
    }

    await User.validateOneThenUpdate(
      { _id: record.user },
      { recentStatus: record._id },
    );

    await UserStatus.updateMany(
      {
        user: record.user,
        status: 'PENDING',
        _id: { '$ne': record._id }
      },
      { status: 'EXPIRED' },
    );

    return res.status(200).json(record);

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const getRecords = deriveGetManyEndpoint(UserStatus, FIELDS_TO_POPULATE);

const getRecord = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such record'});
    }

    const record = await model.findById(id)
      .populate(populateFields)
      .lean();

    if (!record) {
      return res.status(404).json({ error: 'No such record'});
    }

    // Check for item level permission.
    if (
      req.user._id != record.user._id
      && !req.user.roles.some((role) => ['SUPERUSER', 'ADMIN'].includes(role))
    ) {
      return res.status(403).json({ error: 'Request not allowed' });
    }

    return res.status(200).json(record);
  
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such record'});
    }

    let record = await model.findById(id).lean();
    if (!record) {
      return res.status(404).json({ error: 'No such record'});
    }

    // Check for item level permission.
    if (
      req.user._id != record.user._id
      && !req.user.roles.some((role) => ['SUPERUSER', 'ADMIN'].includes(role))
    ) {
      return res.status(403).json({ error: 'Request not allowed' });
    }

    record = await model
      .findOneAndUpdate(
        { _id: id },
        { ...req.body },
      )
      .populate(populateFields)
      .lean();
    if (!record) {
      return res.status(400).json({ error: 'Record not updated'});
    }

    return res.status(200).json(record);
  
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const deleteRecord = deriveDeleteEndpoint(UserStatus, FIELDS_TO_POPULATE);


module.exports = {
  createRecord,
  getRecord,
  getRecords,
  updateRecord,
  deleteRecord,
}
