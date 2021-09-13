const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const { isEmail } = require('validator');

const { UnauthorizedError } = require('../handlerErrors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Это поле обязательно для заполнения'],
    unique: true,
    validate: (v) => isEmail(v),
  },

  password: {
    type: String,
    required: [true, 'Это поле обязательно для заполнения'],
    select: false,
  },

  name: {
    type: String,
    required: [true, 'Это поле обязательно для заполнения'],
    minLength: 2,
    maxLength: 30,
  },
}, { versionKey: false });

userSchema.static('findUserByCredential', function checkToken(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      const hash = user.password;

      if (!user) { // ЕСЛИ ПОЛЬЗОВАТЕЛЬ НЕ НАШЁЛСЯ
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }

      bcrypt.compare(password, hash) // ЕСЛИ НАШЁЛСЯ, ТО ПРОВЕРЯЕМ СОВПАДЕНИЕ ПАРОЛЯ С ХЭШЕМ
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }
          return user;
        });
      return user;
    });
});

module.exports = mongoose.model('User', userSchema);
