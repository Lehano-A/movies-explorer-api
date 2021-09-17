require('dotenv').config();

const { URI_DATABASE, PORT } = process.env;

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

const { centralizedErrors } = require('./utils/handlerErrors/centralizedErrors');

const { NotFoundError } = require('./utils/handlerErrors/NotFoundError');

const { emailRegExp, nameRegExp } = require('./utils/constants');

mongoose.connect(URI_DATABASE);

app.use(cors({
  origin: ['http://moviefan.nomoredomains.club', 'https://moviefan.nomoredomains.club'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
  optionsSuccessStatus: 200,
}));

app.use(helmet());

app.use(requestLogger);

app.use(cookieParser());

app.use(express.static('public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

/* -------------------------- НАЧАЛО МАРШРУТИЗАЦИИ -------------------------- */

// РЕГИСТРАЦИЯ НОВОГО ПОЛЬЗОВАТЕЛЯ
app.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().max(70).required()
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
    email: Joi.string().email().max(70).required()
      .regex(emailRegExp),
    password: Joi.string().alphanum().min(7).max(30)
      .required(),
  }),
}), login);

// ПРОВЕРКА СТАТУСА АВТОРИЗАЦИИ ПОЛЬЗОВАТЕЛЯ
app.use(celebrate({
  [Segments.COOKIES]: Joi.object().keys({
    jwt: Joi.string(),
  }),
}), checkAuth);

// РОУТ USERS
app.use('/users', require('./routes/users'));

// РОУТ MOVIES
app.use('/movies', require('./routes/movies'));

// СТРАНИЦА 404 NOT FOUND
app.get('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не нашлось'));
});

/* --------------------------- КОНЕЦ МАРШРУТИЗАЦИИ -------------------------- */

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  centralizedErrors(err, req, res);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер работает');
});
