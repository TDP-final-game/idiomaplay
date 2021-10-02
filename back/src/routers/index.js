const express = require('express');

const challengeRouter = require('./challengeRouter');
const userRouter = require('./userRouter');

const router = express.Router();

router.use('/domain', challengeRouter);
router.use('/users/me', userRouter);

module.exports = router;

