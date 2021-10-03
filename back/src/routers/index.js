const express = require('express');

const challengeRouter = require('./challengeRouter');
const userRouter = require('./userRouter');

const router = express.Router();

router.use('/challenges', challengeRouter);
router.use('/users', userRouter);

module.exports = router;
