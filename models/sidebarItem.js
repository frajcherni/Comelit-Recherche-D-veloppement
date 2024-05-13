const mongoose = require('mongoose');

const SidebarItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  dropdown: {
    type: Boolean,
    default: false
  },
  dropdownOptions: [{
    label: String,
    value: String,
    permission: Boolean,
    role: String
  }],
  permission: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,

  }
});

module.exports = mongoose.model('SidebarItem', SidebarItemSchema);