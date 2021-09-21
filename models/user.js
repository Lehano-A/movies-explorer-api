const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const { UnauthorizedError } = require('../utils/handlerErrors/UnauthorizedError');

const { currentDate } = require('../utils/constants');

// СХЕМА ПОЛЬЗОВАТЕЛЯ
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },

  created: {
    type: String,
    default: currentDate,
  },
}, { versionKey: false });

userSchema.static('findUserByCredential', function checkToken(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) { // ЕСЛИ ПОЛЬЗОВАТЕЛЬ НЕ НАШЁЛСЯ
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      // ЕСЛИ НАШЁЛСЯ, ТО ПРОВЕРЯЕМ СОВПАДЕНИЕ ПАРОЛЯ С ХЭШЕМ
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
});

module.exports = mongoose.model('User', userSchema);
