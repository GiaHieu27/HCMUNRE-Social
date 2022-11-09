const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const adminSchema = mongoose.Schema(
  {},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Admin', adminSchema);
