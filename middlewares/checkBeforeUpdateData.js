const User = require('../models/user');

const { ConflictError } = require('../utils/handlerErrors/ConflictError');

// ПРОВЕРКА ПЕРЕДАННОГО EMAIL НА НАЛИЧИЕ В БД
function checkEmailBeforeUpdate(req, res, next) {
  const { email } = req.body;
  const { _id } = req.user;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return next();
      }
      const userId = user._id.toString();
      if (user && _id !== userId) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      }
      return next();
    })
    .catch(next);
}

module.exports = { checkEmailBeforeUpdate };
