const express = require('express');

const router = express.Router();

const { validatePostSignUp, validatePostSignIn } = require('../middlewares/validation');

const {
  createUser,
  login,
} = require('../controllers/users');

// РЕГИСТРАЦИЯ НОВОГО ПОЛЬЗОВАТЕЛЯ
router.post('/signup', validatePostSignUp, createUser);

// АУТЕНТИФИКАЦИЯ ПОЛЬЗОВАТЕЛЯ
router.post('/signin', validatePostSignIn, login);

module.exports = router;
