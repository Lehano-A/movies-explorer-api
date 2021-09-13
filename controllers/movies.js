// Возвращает все сохранённые пользователем фильмы
function favouritesMovies() {
  console.log('Получите все сохранённые вами фильмы');
}

/* Создаёт фильм с переданными в теле:
country, director, duration, year, description, image,
trailer, nameRU, nameEN и thumbnail, movieId */
function createMovie() {
  console.log('Вы создали новый фильм');
}

// Удаляет сохранённый фильм по id
function deleteMovie() {
  console.log('Вы удалили сохранённый фильм');
}

module.exports = {
  favouritesMovies,
  createMovie,
  deleteMovie,
};
