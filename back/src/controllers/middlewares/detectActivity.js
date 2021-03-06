'use strict';

const userService = require('../../services/users/userService');

const detectActivity = async (req, res, next) => {
	await userService.detectActivity(req.user.id);
	next();
};

module.exports = detectActivity;
