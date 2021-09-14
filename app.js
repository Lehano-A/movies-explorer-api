/* eslint-disable no-param-reassign */
require('dotenv').config();

const mongoose = require('mongoose');

const express = require('express');

const {
  celebrate,
  Joi,
  errors,
  Segments,
} = require('celebrate');

const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const {
  createUser,
  login,
} = require('./controllers/users');

const app = express();

const { checkAuth } = require('./middlewares/checkAuth');

mongoose.connect('mongodb://localhost:27017/bitmoviesdb');

const port = 3000;

app.use(cookieParser());

// app.use(express.static('public'));

app.use(bodyParser.json());

// РЕГИСТРАЦИЯ НОВОГО ПОЛЬЗОВАТЕЛЯ
app.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).max(70).required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), createUser);

// АУТЕНТИФИКАЦИЯ ПОЛЬЗОВАТЕЛЯ
app.post('/signin', login);

// ПРОВЕРКА АУТЕНТИФИКАЦИИ

app.use(checkAuth);

app.use('/users', require('./routes/users'));

app.use('/movies', require('./routes/movies'));

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  // const customError = handlerCustomErrors(err);

  // if (customError) {
  //   err.message = customError;
  // }

  res.status(statusCode).send({
    message: statusCode === 500 /* && customError === false */ ? 'Приносим извинения - данный запрос не может быть выполнен сервером' : message,
  });
});

app.listen(port, () => {
  console.log('Всё работает');
});
