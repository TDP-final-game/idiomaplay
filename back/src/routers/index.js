const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const adminRouter = require('./domainRouter');

router.use('/domain', adminRouter);

module.exports = router;
