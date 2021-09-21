const Movie = require('../models/movie');

const { ForbiddenError } = require('../utils/handlerErrors/ForbiddenError');
const { NotFoundError } = require('../utils/handlerErrors/NotFoundError');

// ПРОВЕРКА НА ВЛАДЕЛЬЦА СОХРАНЁННОГО ФИЛЬМА
function checkOwnerMovie(req, res, next) {
  const userId = req.user._id;
  const { _id } = req.params;

  Movie.findOne({ _id })
    .orFail(new NotFoundError('Такой карточки на сервере не существует')) // ПРИ ОТПРАВКЕ НЕСУЩЕСТВУЮЩЕГО _id КАРТОЧКИ
    .then((movie) => {
      const movieOwner = movie.owner.toString();

      if (userId !== movieOwner) {
        throw new ForbiddenError('Вы не являетесь владельцем этой карточки');
      }
      next();
    })
    .catch(next);
}

module.exports = {
  checkOwnerMovie,
};
