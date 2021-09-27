const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const userRouter = require('./userRouter');
// const challengeRouter = ...

router.use('/users', userRouter);

module.exports = router;
