const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const userStatusSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  calamity: {
    type: Schema.Types.ObjectId,
    ref: 'Calamity',
  },
  status: {
    type: String,
    enum: ['PENDING', 'NOT_SAFE', 'SAFE', 'EXPIRED'],
    default: 'PENDING',
  },
}, { timestamps: true });


module.exports = mongoose.model('UserStatus', userStatusSchema);
