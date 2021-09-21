const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 ЧАС
  max: 100, // ОГРАНИЧЕНИЕ КАЖДОГО IP АДРЕСА
  message: { message: 'С вашего IP поступило слишком много запросов. Попробуйте повторить попытку через 1 час.' },
});

module.exports = {
  rateLimiter,
};
