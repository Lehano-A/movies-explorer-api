const { NotFoundError } = require('./NotFoundError');

const messageError = {
  cardNotFound: "Cannot read property 'owner' of null",
};

const { cardNotFound } = messageError;

function handlerCustomErrors(err, next) {
  console.log(err.message === cardNotFound);
  if (err.message === cardNotFound) {
    return next(new NotFoundError('Такой карточки не существует'));
  }
  console.log('qqqqqqqqqqqqqqq');
  return undefined;
}

module.exports = {
  handlerCustomErrors,
};
