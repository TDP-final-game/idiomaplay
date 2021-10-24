'use strict';

const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', userController.createUser);
router.post('/session', userController.logIn);
router.get('/:userId/challengeAttempts', userController.listChallengesAttempts);

module.exports = router;
