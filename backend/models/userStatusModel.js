const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const userStatusSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  calamity: {
    type: Schema.Types.ObjectId,
    ref: 'Calamity',
    required: true,
  },
  status: {
    type: String,
    enum: ['PENDING', 'NOT_SAFE', 'SAFE', 'EXPIRED'],
    default: 'PENDING',
    required: true,
  },
}, { timestamps: true });


module.exports = mongoose.model('UserStatus', userStatusSchema);
