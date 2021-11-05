'use strict';

const express = require('express');

const userController = require('../controllers/userController');

const errorHandler = require('../controllers/middlewares/errorHandler');


const router = express.Router();

router.post('/', errorHandler, userController.createUser);
router.post('/session', errorHandler, userController.logIn);
router.get('/me/challengeAttempts', errorHandler, userController.listChallengesAttempts);
router.get('/me/stats', errorHandler, userController.getStats);

module.exports = router;
