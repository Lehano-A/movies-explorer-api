const express = require('express');

const router = express.Router();

const {
  userData,
  updateUserData,
} = require('../controllers/users');

// Возвращает информацию о пользователе (email и имя)
router.get('/me', userData);

// Обновляет информацию о пользователе (email и имя)
router.patch('/me', updateUserData);

module.exports = router;
