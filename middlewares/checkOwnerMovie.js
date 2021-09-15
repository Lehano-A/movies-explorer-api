const Movie = require('../models/movie');

const { ForbiddenError } = require('../handlerErrors/ForbiddenError');
const { NotFoundError } = require('../handlerErrors/NotFoundError');

function checkOwnerMovie(req, res, next) {
  const { _id } = req.user;
  const { movieId } = req.params;
  Movie.findOne({ movieId })
    .orFail(next(new NotFoundError('Такой карточки не существует')))
    .then((movie) => {
      const movieOwner = movie.owner.toString();

      if (_id !== movieOwner) {
        throw new ForbiddenError('У вас недостаточно прав для удаления');
      }
      next();
    })
    .catch(next);
}

module.exports = {
  checkOwnerMovie,
};
