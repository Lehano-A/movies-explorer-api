const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const { UnauthorizedError } = require('../handlerErrors/UnauthorizedError');

function checkAuth(req, res, next) {
  const jwtToken = req.cookies.jwt;

  if (!jwtToken) {
    return next(new UnauthorizedError('Вам необходимо авторизоваться для получения доступа к ресурсу'));
  }

  // console.log(jwt.verify(jwtToken, NODE_ENV === 'production' ? JWT_SECRET : 'development'));

}

module.exports = {
  checkAuth,
};
