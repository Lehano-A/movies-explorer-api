const rateLimit = require('express-rate-limit');

const { tooManyRequests } = require('../utils/constants');

const rateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 ЧАС
  max: 100, // ОГРАНИЧЕНИЕ КАЖДОГО IP АДРЕСА
  message: { message: tooManyRequests },
});

module.exports = {
  rateLimiter,
};
