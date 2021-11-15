'use strict';

const express = require('express');

const adminUserController = require('../controllers/adminUserController');

const router = express.Router();

router.post('/', adminUserController.createUser);
router.get('/', adminUserController.list);
router.post('/session', adminUserController.logIn);

module.exports = router;
