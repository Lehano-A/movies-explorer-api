const express = require('express');

const router = express.Router();

const { checkEmailBeforeUpdate } = require('../middlewares/checkBeforeUpdateData');

const { validatePatchUserData } = require('../middlewares/validation');

const {
  userData,
  updateUserData,
  logout,
} = require('../controllers/users');

// ВОЗВРАЩАЕТ ИНФОРМАЦИЮ О ПОЛЬЗОВАТЕЛЕ (EMAIL И NAME)
router.get('/me', userData);

// РАЗЛОГИНИВАЕТ ПОЛЬЗОВАТЕЛЯ
router.get('/logout', logout);

// ОБНОВЛЯЕТ ИНФОРМАЦИЮ О ПОЛЬЗОВАТЕЛЕЙ (EMAIL И NAME)
router.patch('/me', validatePatchUserData, checkEmailBeforeUpdate, updateUserData);

module.exports = router;
