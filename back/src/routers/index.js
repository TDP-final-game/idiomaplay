'use strict';

const express = require('express');

const challengeRouter = require('./challengeRouter');
const challengeAttemptRouter = require('./challengeAttemptRouter');
const userRouter = require('./userRouter');
const adminUserRouter = require('./adminUserRouter');

const router = express.Router();

router.use('/challenges', challengeRouter);
router.use('/users', userRouter);
router.use('/adminUsers', adminUserRouter);
router.use('/challengeAttempts', challengeAttemptRouter);

module.exports = router;
