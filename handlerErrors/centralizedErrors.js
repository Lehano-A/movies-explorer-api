// eslint-disable-next-line no-unused-vars
function centralizedErrors(err, req, res, next) {
  console.log('ЦЕНТРАЛИЗОВАННЫЙ ОБРАБОТЧИК');
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'Данный запрос не может быть выполнен сервером' : message,
  });
}

module.exports = {
  centralizedErrors,
};
