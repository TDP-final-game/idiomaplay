const express = require('express');

const router = express.Router();

const domainRouter = require('./domainRouter');
const userRouter = require('./userRouter');

router.use('/domain', domainRouter);
router.use('/users/me', userRouter);

module.exports = router;
