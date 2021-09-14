const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const { UnauthorizedError } = require('../handlerErrors/UnauthorizedError');

function checkAuth(req, res, next) {
  const jwtToken = req.cookies.jwt;

  if (!jwtToken) {
    return next(new UnauthorizedError('Вам необходимо авторизоваться для получения доступа к ресурсу'));
  }

  let payload;

  try {
    // ЕСЛИ ТОКЕН ВАЛИДЕН
    payload = jwt.verify(jwtToken, NODE_ENV === 'production' ? JWT_SECRET : 'development');

    // ЕСЛИ ТОКЕН ОКАЗАЛСЯ НЕВАЛИДНЫМ
  } catch (err) { return next(new UnauthorizedError('Вам необходимо авторизоваться для получения доступа к ресурсу')); }

  req.body.payload = payload;

  return next();
}

module.exports = {
  checkAuth,
};
