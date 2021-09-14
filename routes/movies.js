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

// Возвращает все сохранённые пользователем фильмы
router.get('/', getFavouritesMovies);

/* Создаёт фильм с переданными в теле:
country, director, duration, year, description, image,
trailer, nameRU, nameEN и thumbnail, movieId */
router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().min(1).required(),
    director: Joi.string().min(1).required(),
    duration: Joi.string().min(1).required(),
    year: Joi.number().min(2).required(),
    description: Joi.string().min(1).required(),
    image: Joi.string().required().regex(urlRegExp),
    trailer: Joi.string().required().regex(urlRegExp),
    nameRU: Joi.string().min(1).required(),
    nameEN: Joi.string().min(1).required(),
    thumbnail: Joi.string().required().regex(urlRegExp),
    movieId: Joi.string().min(1).required(),
  }),
}), saveMovie);

// Удаляет сохранённый фильм по id
router.delete('/:movieId', checkOwnerMovie, deleteMovie);

module.exports = router;
