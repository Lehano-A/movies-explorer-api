const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

// const ConflictError = require('../handlerErrors/ConflictError');

// РЕГИСТРАЦИЯ НОВОГО ПОЛЬЗОВАТЕЛЯ
function createUser(req, res, next) {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then(() => {
          res.send({
            data: {
              email,
              name,
            },
          });
        })
        .catch(next);
    })
    .catch(next);
}

// АУТЕНТИФИКАЦИЯ ПОЛЬЗОВАТЕЛЯ
function login(req, res, next) {
  const { email, password } = req.body;

  User.findUserByCredential(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'development', { expiresIn: '7d' });

      res.cookie('jwt', token, { maxAge: 3600000 * 7 * 24, httpOnly: true });
      res.send({ message: 'Вы успешно зашли в систему' });
    })
    .catch(next);
}

// ВОЗВРАЩАЕТ ИНФОРМАЦИЮ О ПОЛЬЗОВАТЕЛЕ (EMAIL И NAME)
function userData(req, res, next) {
  const { _id } = req.user;
  User.findById({ _id })
    .then((user) => {
      res.send({
        data: {
          email: user.email,
          name: user.name,
        },
      });
    })
    .catch(next);
}

// ОБНОВЛЯЕТ ИНФОРМАЦИЮ О ПОЛЬЗОВАТЕЛЕЙ (EMAIL И NAME)
function updateUserData(req, res, next) {
  const { email, name } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate({ _id }, { email, name }, { new: true })
    .then((user) => {
      res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
}

module.exports = {
  createUser,
  login,
  userData,
  updateUserData,
};
