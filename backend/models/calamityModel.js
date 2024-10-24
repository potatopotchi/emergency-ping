const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const calamitySchema = new Schema({
  categories: [String],
  description: {
    type: String,
  },
  severity: {
    type: String,
    enum: ['LOW', 'NORMAL', 'HIGH'],
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  locationGroups: [
    {
      type: Schema.Types.ObjectId,
      ref: 'LocationGroup',
    }
  ],
}, { timestamps: true });


module.exports = mongoose.model('Calamity', calamitySchema);
