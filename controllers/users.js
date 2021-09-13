const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

const ConflictError = require('../handlerErrors/ConflictError');

// Регистрация нового пользователя
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

// Аутентификация пользователя
function login(req, res, next) {
  const { email, password } = req.body;

  User.findUserByCredential(email, password)
    .then((user) => {
      const token = jwt.sign({ data: { id: user._id } }, NODE_ENV === 'production' ? JWT_SECRET : 'development', { expiresIn: '7d' });

      res.cookie('jwt', token, { maxAge: 3600000 * 7 * 24, httpOnly: true });
      res.send({ message: 'Вы успешно зашли в систему' });
    })
    .catch(next);
}

// Возвращает информацию о пользователе (email и имя)
function userData() {
  console.log('Данные вашего профайла');
}

// Обновляет информацию о пользователе (email и имя)
function updateUserData() {
  console.log('Обновили данные пользователя');
}

module.exports = {
  createUser,
  login,
  userData,
  updateUserData,
};
