const LocationGroup = require('../models/locationGroupModel');
const {
  deriveCreateEndpoint,
  deriveGetManyEndpoint,
  deriveGetOneEndpoint,
  deriveUpdateEndpoint,
  deriveDeleteEndpoint,
} = require('../core/controllers');


const createRecord = deriveCreateEndpoint(LocationGroup);
const getRecords = deriveGetManyEndpoint(LocationGroup);
const getRecord = deriveGetOneEndpoint(LocationGroup);
const updateRecord = deriveUpdateEndpoint(LocationGroup);
const deleteRecord = deriveDeleteEndpoint(LocationGroup);


module.exports = {
  createRecord,
  deleteRecord,
  getRecord,
  getRecords,
  updateRecord,
};
