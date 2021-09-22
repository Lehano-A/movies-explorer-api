const mongoose = require('mongoose');

const validator = require('validator');

const { currentDate } = require('../utils/constants');

// СХЕМА ФИЛЬМА
const movieSchema = new mongoose.Schema({

  country: {
    type: String,
    required: true,
  },

  director: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  year: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
    },
  },

  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
    },
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
    unique: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created: {
    type: String,
    default: currentDate,
  },
}, { versionKey: false });

module.exports = mongoose.model('Movie', movieSchema);
