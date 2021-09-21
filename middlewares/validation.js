const { celebrate, Joi, Segments } = require('celebrate');

const validator = require('validator');

const { nameRegExp } = require('../utils/constants');

// ВАЛИДАЦИЯ ПЕРЕД СОХРАНЕНИЕМ НОВОГО ФИЛЬМА
const validatePostNewMovie = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.number().integer().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((v, helper) => {
      if (validator.isURL(v, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true })) { return v; }
      return helper.message('Ссылка на изображение невалидна');
    }),
    trailer: Joi.string().required().custom((v, helper) => {
      if (validator.isURL(v, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true })) { return v; }
      return helper.message('Ссылка на изображение невалидна');
    }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom((v, helper) => {
      if (validator.isURL(v, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true })) { return v; }
      return helper.message('Ссылка на изображение невалидна');
    }),
    movieId: Joi.string().required(),
  }),
});

// ВАЛИДАЦИЯ ПЕРЕД УДАЛЕНИЕМ ФИЛЬМА
const validateDeleteMovie = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    _id: Joi.string().max(100).required(),
  }),
});

// ВАЛИДАЦИЯ ПЕРЕД ОБНОВЛЕНИЕМ ДАННЫХ ПРОФАЙЛА ПОЛЬЗОВАТЕЛЯ
const validatePatchUserData = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required()
      .regex(nameRegExp),
  }),
});

// ВАЛИДАЦИЯ КУКИ ПЕРЕД АВТОРИЗАЦИЕЙ
const validateCookie = celebrate({
  [Segments.COOKIES]: Joi.object().keys({
    jwt: Joi.string(),
  }),
});

// ВАЛИДАЦИЯ ДАННЫХ ПЕРЕД РЕГИСТРАЦИЕЙ
const validatePostSignUp = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().max(70).required(),
    password: Joi.string().min(7).max(30).required(),
    name: Joi.string().min(2).max(30).required()
      .regex(nameRegExp),
  }),
});

// ВАЛИДАЦИЯ ДАННЫХ ПЕРЕД АУТЕНТИФИКАЦИЕЙ
const validatePostSignIn = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().max(70).required(),
    password: Joi.string().min(7).max(30).required(),
  }),
});

module.exports = {
  validatePostNewMovie,
  validateDeleteMovie,
  validatePatchUserData,
  validateCookie,
  validatePostSignUp,
  validatePostSignIn,
};
