const alreadyRegisteredError = 'duplicate key error collection';

const validatorError = 'ValidatorError';

const mongoErrors = {
  ValidatorError: ['ValidationError User validation failed: name: Это поле обязательно для заполнения'],
  MongoServerError: ['duplicate key error collection', 'wcewcergrbtrbrtb', 'sdcdscsdcsdc'],
};

const customErrors = [
  'Пользователь с таким email уже зарегистрирован',
];

function checkMessageError(error, message) {
  return error[1].find((item) => message.includes(item));
}

function checkNameError(name) {
  return Object.entries(mongoErrors).find((item) => item.includes(name));
}

function handlerCustomErrors(err, req, res, next) {
  const { name, message } = err;
  const nameError = checkNameError(name);
  const messageError = checkMessageError(nameError, message);

  return messageError ? message : false;
}
/* const hasMessageError = (err, message) => {
  if (err.includes(message)) {
    return true;
  }
  return false;
}; */

module.exports = {
  alreadyRegisteredError,
  validatorError,
  handlerCustomErrors,
  /*   hasMessageError, */
};


