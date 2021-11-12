const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const { UnauthorizedError } = require('../utils/handlerErrors/UnauthorizedError');

const { needAuth } = require('../utils/constants');

// ПРОВЕРКА СТАТУСА АВТОРИЗАЦИИ
function checkAuth(req, res, next) {
  const jwtToken = req.cookies.jwt;

  if (!jwtToken) {
    return next(new UnauthorizedError(needAuth));
  }

  let payload;

  try {
    // ЕСЛИ ТОКЕН ВАЛИДЕН
    payload = jwt.verify(jwtToken, NODE_ENV === 'production' ? JWT_SECRET : 'development');

    // ЕСЛИ ТОКЕН ОКАЗАЛСЯ НЕВАЛИДНЫМ
  } catch (err) {
    res.clearCookie('jwt');
    return next(new UnauthorizedError(needAuth));
  }

  req.user = payload;

  return next();
}

module.exports = {
  checkAuth,
};
