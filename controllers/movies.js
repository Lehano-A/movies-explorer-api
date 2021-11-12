const Movie = require('../models/movie');

// ВОЗВРАЩАЕТ ВСЕ СОХРАНЁННЫЕ ПОЛЬЗОВАТЕЛЕМ ФИЛЬМЫ
function getFavouritesMovies(req, res, next) {
  Movie.find({})
    .then((movies) => { res.send(movies); })
    .catch(next);
}

/* СОЗДАЁТ ДОКУМЕНТ-ФИЛЬМ С ПЕРЕДАННЫМИ В ТЕЛЕ ДАННЫМИ:
country, director, duration, year, description, image,
trailer, nameRU, nameEN и thumbnail, movieId */
function saveMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  const { _id } = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: _id,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
}

// УДАЛЯЕТ СОХРАНЁННЫЙ ФИЛЬМ ПО ID
function deleteMovie(req, res, next) {
  const { _id } = req.params;

  Movie.findOneAndDelete({ _id })
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
}

module.exports = {
  getFavouritesMovies,
  saveMovie,
  deleteMovie,
};
