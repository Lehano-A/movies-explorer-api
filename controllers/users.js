const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

const { ConflictError } = require('../utils/handlerErrors/ConflictError');

const {
  currentDate,
  successfulLogout,
  userWithEmailAlreadyExists,
  successfulAuth,
  successfulReg,
} = require('../utils/constants');

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
        .then((user) => {
          res.send({
            user: {
              _id: user._id,
              email: user.email,
              name: user.name,
              created: user.created,
            },
            message: successfulReg,
          });
        })
        .catch(() => { next(new ConflictError(userWithEmailAlreadyExists)); });
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

      res.send({
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          created: user.created,
        },
        message: successfulAuth,
      });
    })
    .catch(next);
}

// ВОЗВРАЩАЕТ ИНФОРМАЦИЮ О ПОЛЬЗОВАТЕЛЕ (EMAIL И NAME)
function userData(req, res, next) {
  const { _id } = req.user;
  User.findById({ _id })
    .select('-password')
    .then((user) => {
      res.send({ user });
    })
    .catch(next);
}

// ОБНОВЛЯЕТ ИНФОРМАЦИЮ О ПОЛЬЗОВАТЕЛЕ (EMAIL И NAME)
function updateUserData(req, res, next) {
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
    .select('-password')
    .then((user) => {
      res.send({
        _id: user._id,
        email: user.email,
        name: user.name,
        created: user.created,
        updated: currentDate(),
      });
    })
    .catch(next);
}

// РАЗЛОГИНИВАЕТ ПОЛЬЗОВАТЕЛЯ
function logout(req, res, next) {
  const { _id } = req.user;
  User.findOne({ _id })
    .select('-password')
    .then((user) => {
      res.clearCookie('jwt');
      res.send({ user, message: successfulLogout });
    })
    .catch(next);
}

module.exports = {
  createUser,
  login,
  userData,
  updateUserData,
  logout,
};
