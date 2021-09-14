const express = require('express');

const router = express.Router();

const {
  userData,
  updateUserData,
} = require('../controllers/users');

// ВОЗВРАЩАЕТ ИНФОРМАЦИЮ О ПОЛЬЗОВАТЕЛЕ (EMAIL И NAME)
router.get('/me', userData);

// ОБНОВЛЯЕТ ИНФОРМАЦИЮ О ПОЛЬЗОВАТЕЛЕЙ (EMAIL И NAME)
router.patch('/me', updateUserData);

module.exports = router;
