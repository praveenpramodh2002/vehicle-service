const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); // Ensure exactly 10 digits for phone numbers
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  nic: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{12}$|^\d{9}[vV]$/.test(v); // NIC must be 12 digits or 9 digits followed by 'V' or 'v'
      },
      message: (props) => `${props.value} is not a valid NIC!`,
    },
  },
  birthday: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
