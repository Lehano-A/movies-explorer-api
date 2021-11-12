const { requestCanNotBeExecutedServer } = require('../constants');

function centralizedErrors(err, req, res) {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? requestCanNotBeExecutedServer : message,
  });
}

module.exports = {
  centralizedErrors,
};
