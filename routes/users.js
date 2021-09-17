const express = require('express');

const router = express.Router();

const { celebrate, Joi, Segments } = require('celebrate');

const { emailRegExp, nameRegExp } = require('../utils/constants');

const {
  userData,
  updateUserData,
  logout,
} = require('../controllers/users');

// ВОЗВРАЩАЕТ ИНФОРМАЦИЮ О ПОЛЬЗОВАТЕЛЕ (EMAIL И NAME)
router.get('/me', userData);

router.get('/logout', logout);

// ОБНОВЛЯЕТ ИНФОРМАЦИЮ О ПОЛЬЗОВАТЕЛЕЙ (EMAIL И NAME)
router.patch('/me', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().max(70)
      .regex(emailRegExp),
    name: Joi.string().min(2).max(30)
      .regex(nameRegExp),
  }),
}), updateUserData);

module.exports = router;
