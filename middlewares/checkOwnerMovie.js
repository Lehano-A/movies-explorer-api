const Movie = require('../models/movie');

const { ForbiddenError } = require('../utils/handlerErrors/ForbiddenError');
const { NotFoundError } = require('../utils/handlerErrors/NotFoundError');

// ПРОВЕРКА НА ВЛАДЕЛЬЦА СОХРАНЁННОГО ФИЛЬМА
function checkOwnerMovie(req, res, next) {
  const { _id } = req.user;
  const { movieId } = req.params;

  Movie.findOne({ movieId })
    .orFail(new NotFoundError('Такой карточки на сервере не существует')) // ПРИ ОТПРАВКЕ НЕСУЩЕСТВУЮЩЕГО ID КАРТОЧКИ
    .then((movie) => {
      const movieOwner = movie.owner.toString();

      if (_id !== movieOwner) {
        throw new ForbiddenError('Вы не являетесь владельцем этой карточки');
      }
      next();
    })
    .catch(next);
}

module.exports = {
  checkOwnerMovie,
};
