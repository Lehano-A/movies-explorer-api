const express = require('express');

const router = express.Router();

const {
  favouritesMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// Возвращает все сохранённые пользователем фильмы
router.get('/', favouritesMovies);

/* Создаёт фильм с переданными в теле:
country, director, duration, year, description, image,
trailer, nameRU, nameEN и thumbnail, movieId */
router.post('/', createMovie);

// Удаляет сохранённый фильм по id
router.delete('/:moviesId', deleteMovie);

module.exports = router;
