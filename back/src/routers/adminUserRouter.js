'use strict';

const express = require('express');

const adminUserController = require('../controllers/adminUserController');

const router = express.Router();

router.post('/session', adminUserController.logIn);

router.get('/data/dailyAccess', adminUserController.getDailyAccessData);

router.get('/data/usersAccess', adminUserController.getUserAccessData);

router.get('/data/dailyUnitsFinished', adminUserController.getDailyUnitsFinished);

router.get('/data/unitAverageResolutionTime', adminUserController.getUnitAverageResolutionTime);

module.exports = router;
