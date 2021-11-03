'use strict';

const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', userController.createUser);
router.post('/session', userController.logIn);
router.get('/me/challengeAttempts', userController.listChallengesAttempts);
router.get('/me', userController.getUserInfo);

module.exports = router;
