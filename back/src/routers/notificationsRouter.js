'use strict';

const express = require('express');

const notificationsController = require('../controllers/notificationsController');

const middlewares = require('../controllers/middlewares/index');

const router = express.Router();

router.post('/', middlewares, notificationsController.sendNotification);

module.exports = router;
