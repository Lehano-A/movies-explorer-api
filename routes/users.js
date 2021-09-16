const { celebrate, Joi, Segments } = require('celebrate');

const express = require('express');

const router = express.Router();

const { emailRegExp, nameRegExp } = require('../utils/constants');

const {
  userData,
  updateUserData,
} = require('../controllers/users');

// ВОЗВРАЩАЕТ ИНФОРМАЦИЮ О ПОЛЬЗОВАТЕЛЕ (EMAIL И NAME)
router.get('/me', userData);

// ОБНОВЛЯЕТ ИНФОРМАЦИЮ О ПОЛЬЗОВАТЕЛЕЙ (EMAIL И NAME)
router.patch('/me', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().max(50).required()
      .regex(emailRegExp),
    name: Joi.string().min(2).max(30).required()
      .regex(nameRegExp),
  }),
}), updateUserData);

module.exports = router;
