'use strict';

const userService = require('../../services/users/userService');

const detectActivity = async (req, res, next) => {

	userService.detectActivity(req.user._id);
	next();
};

module.exports = detectActivity;
