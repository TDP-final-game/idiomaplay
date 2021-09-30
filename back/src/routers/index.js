const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const domainRouter = require('./domainRouter');
const userRouter = require('./userRouter');

router.use('/domain', domainRouter);
router.use('/users/me', userRouter);

module.exports = router;
