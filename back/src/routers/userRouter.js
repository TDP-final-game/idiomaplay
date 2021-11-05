'use strict';

const express = require('express');

const userController = require('../controllers/userController');

const errorHandler = require('../controllers/middlewares/errorHandler');
const middlewares = require('../controllers/middlewares/index');

const router = express.Router();

router.post('/', errorHandler, userController.createUser);
router.post('/session', errorHandler, userController.logIn);
router.get('/me/challengeAttempts', middlewares, userController.listChallengesAttempts);
router.get('/me/stats', middlewares, userController.getStats);

module.exports = router;
