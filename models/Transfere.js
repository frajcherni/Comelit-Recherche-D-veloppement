
const mongoose = require('mongoose');

const TransferSchema = new mongoose.Schema({
  Code: {
    type: String,
    required: true
  },
  Designation: {
    type: String,
    required: true
  },
  Department: {
    type: String,
    required: true
  },
  ToDepartment: {
    type: String,
    required: true
  },
  QuantityTransfer: {
    type: Number,
    required: true
  },
 
  DateTransfer: {
    type: Date,
    required: true
  },
  
});

const Transfer = mongoose.model('TransferStock', TransferSchema);

module.exports = Transfer;