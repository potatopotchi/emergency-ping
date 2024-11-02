const User = require('../models/userModel');
const UserStatus = require('../models/userStatusModel');
const {
  deriveCreateEndpoint,
  deriveGetManyEndpoint,
  deriveGetOneEndpoint,
  deriveUpdateEndpoint,
  deriveDeleteEndpoint,
} = require('../core/controllers');


const createRecord = deriveCreateEndpoint(UserStatus);
const getRecords = deriveGetManyEndpoint(UserStatus);

const getRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { fpop, select } = req.query;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such record'});
    }

    const record = await model.findById(id)
      .populate(fpop)
      .select(select)
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
    const { fpop, select } = req.query;

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
      .populate(fpop)
      .select(select)
      .lean();

    if (!record) {
      return res.status(400).json({ error: 'Record not updated'});
    }

    return res.status(200).json(record);
  
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const deleteRecord = deriveDeleteEndpoint(UserStatus);


module.exports = {
  createRecord,
  getRecord,
  getRecords,
  updateRecord,
  deleteRecord,
}
