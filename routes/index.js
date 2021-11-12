const express = require('express');

const app = express();

const { checkAuth } = require('../middlewares/checkAuth');

const { NotFoundError } = require('../utils/handlerErrors/NotFoundError');

const { validateCookie } = require('../middlewares/validation');

const { notFoundPage } = require('../utils/constants');

// РЕГИСТРАЦИЯ НОВОГО ПОЛЬЗОВАТЕЛЯ И АУТЕНТИФИКАЦИЯ
app.post('/sign(in|up)?', require('./signInUp'));

// ПРОВЕРКА СТАТУСА АВТОРИЗАЦИИ ПОЛЬЗОВАТЕЛЯ
app.use(validateCookie, checkAuth);

// РОУТ USERS
app.use('/users', require('./users'));

// РОУТ MOVIES
app.use('/movies', require('./movies'));

// СТРАНИЦА 404 NOT FOUND
app.all('*', (req, res, next) => {
  next(new NotFoundError(notFoundPage));
});

module.exports = app;
