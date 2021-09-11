const mongoose = require('mongoose');

const { isURL } = require('validator');

const User = require('./user');

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
    type: String,
    required: true,
  },

  year: {
    type: Date,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
    validate: (v) => isURL(v),
  },

  trailer: {
    type: String,
    required: true,
    validate: (v) => isURL(v),
  },

  thumbnail: {
    type: String,
    required: true,
    validate: (v) => isURL(v),
  },

  owner: {
    type: mongoose.ObjectId,
    ref: User,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.Schema('movie', movieSchema);
