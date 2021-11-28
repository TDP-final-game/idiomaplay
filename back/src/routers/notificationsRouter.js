'use strict';

const express = require('express');

const notificationsController = require('../controllers/notificationsController');

const router = express.Router();

router.post('/', notificationsController.sendNotification);

module.exports = router;
