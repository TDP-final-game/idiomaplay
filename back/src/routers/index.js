'use strict';

const express = require('express');

const challengeRouter = require('./challengeRouter');
const challengeAttemptRouter = require('./challengeAttemptRouter');
const userRouter = require('./userRouter');

const router = express.Router();

router.use('/challenges', challengeRouter);
router.use('/users', userRouter);
router.use('/challengeAttempts', challengeAttemptRouter);

module.exports = router;
