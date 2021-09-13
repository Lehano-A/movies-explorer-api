/* eslint-disable no-param-reassign */
require('dotenv').config();

const mongoose = require('mongoose');

const express = require('express');

const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const usersRouter = require('./routes/users');

const {
  createUser,
  login,
} = require('./controllers/users');

const moviesRouter = require('./routes/movies');

const app = express();

const { alreadyRegisteredError, hasMessageError, validatorError, handlerCustomErrors } = require('./handlerErrors/customErrors');

const { checkAuth } = require('./middlewares/checkAuth');

mongoose.connect('mongodb://localhost:27017/bitmoviesdb');

const port = 3000;

app.use(cookieParser());

// app.use(express.static('public'));

app.use(bodyParser.json());


// Регистрация нового пользователя
app.post('/signup', createUser);

// Аутентификация пользователя
app.post('/signin', login);

app.use(checkAuth);

app.use('/users', usersRouter);

app.use('/movies', moviesRouter);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  // const customError = handlerCustomErrors(err);

  // if (customError) {
  //   err.message = customError;
  // }

  res.status(statusCode).send({
    message: statusCode === 500 /* && customError === false */ ? 'Приносим извинения - данный запрос не может быть выполнен сервером' : message
  });
});

app.listen(port, () => {
  console.log('Всё работает');
});
