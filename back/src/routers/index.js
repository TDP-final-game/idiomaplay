const express = require('express');

const domainRouter = require('./domainRouter');
const userRouter = require('./userRouter');

const router = express.Router();

router.use('/domain', domainRouter);
router.use('/users/me', userRouter);

module.exports = router;

