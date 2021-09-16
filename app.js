/* eslint-disable no-param-reassign */
require('dotenv').config();

const { URI_DATABASE } = process.env;

const mongoose = require('mongoose');

const express = require('express');

const cors = require('cors');

const {
  celebrate,
  Joi,
  errors,
  Segments,
} = require('celebrate');

const helmet = require('helmet');

const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  createUser,
  login,
} = require('./controllers/users');

const app = express();

const { checkAuth } = require('./middlewares/checkAuth');

const { centralizedErrors } = require('./handlerErrors/centralizedErrors');

mongoose.connect(URI_DATABASE);

const port = 3000;

const { NotFoundError } = require('./handlerErrors/NotFoundError');

const { emailRegExp, nameRegExp } = require('./utils/constants');

app.use(cors());

app.use(helmet());

app.use(requestLogger);

app.use(cookieParser());

app.use(express.static('public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// РЕГИСТРАЦИЯ НОВОГО ПОЛЬЗОВАТЕЛЯ
app.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().max(50).required()
      .regex(emailRegExp),
    password: Joi.string().alphanum().min(7).max(30)
      .required(),
    name: Joi.string().min(2).max(30).required()
      .regex(nameRegExp),
  }),
}), createUser);

// АУТЕНТИФИКАЦИЯ ПОЛЬЗОВАТЕЛЯ
app.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().max(50).required()
      .regex(emailRegExp),
    password: Joi.string().alphanum().min(7).max(30)
      .required(),
  }),
}), login);

// ПРОВЕРКА АУТЕНТИФИКАЦИИ

app.use(celebrate({
  [Segments.COOKIES]: Joi.object().keys({
    jwt: Joi.string(),
  }),
}), checkAuth);

app.use('/users', require('./routes/users'));

app.use('/movies', require('./routes/movies'));

app.get('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не нашлось'));
});

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log('uimjyumuimumumyu');
  centralizedErrors(err, req, res);
});

app.listen(port, () => {
  console.log('Сервер работает');
});
