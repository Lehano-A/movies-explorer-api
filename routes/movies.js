const express = require('express');

const router = express.Router();

const { celebrate, Joi, Segments } = require('celebrate');

const { urlRegExp } = require('../utils/constants');

const {
  getFavouritesMovies,
  saveMovie,
  deleteMovie,
} = require('../controllers/movies');

const { checkOwnerMovie } = require('../middlewares/checkOwnerMovie');

// ВОЗВРАЩАЕТ ВСЕ СОХРАНЁННЫЕ ПОЛЬЗОВАТЕЛЕМ ФИЛЬМЫ
router.get('/', getFavouritesMovies);

/* СОЗДАЁТ ДОКУМЕНТ-ФИЛЬМ С ПЕРЕДАННЫМИ В ТЕЛЕ ДАННЫМИ:
country, director, duration, year, description, image,
trailer, nameRU, nameEN и thumbnail, movieId */
router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.number().integer().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    trailer: Joi.string().required().regex(urlRegExp),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().regex(urlRegExp),
    movieId: Joi.string().required(),
  }),
}), saveMovie);

// УДАЛЯЕТ СОХРАНЁННЫЙ ФИЛЬМ ПО ID
router.delete('/:movieId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    movieId: Joi.string().required(),
  }),
}), checkOwnerMovie, deleteMovie);

module.exports = router;
