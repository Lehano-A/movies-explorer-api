const mongoose = require('mongoose');

const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (v) => isEmail(v),
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  name: {
    type: String,
    default: 'Например: Александр или Мария',
    required: true,
    minLength: 2,
    maxLength: 30,
  },
}, { versionKey: false });

module.exports = mongoose.model('User', userSchema);
