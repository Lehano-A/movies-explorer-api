const express = require('express');

const router = express.Router();

const { validatePostNewMovie, validateDeleteMovie } = require('../middlewares/validation');

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
router.post('/', validatePostNewMovie, saveMovie);

// УДАЛЯЕТ СОХРАНЁННЫЙ ФИЛЬМ ПО ID
router.delete('/:_id', validateDeleteMovie, checkOwnerMovie, deleteMovie);

module.exports = router;
