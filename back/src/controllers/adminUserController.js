'use strict';

const adminUserService = require('../services/admin/adminService');
const STATUS_CODES = require('../constants/status_codes.json');

const logIn = async (req, res) => {
	// #swagger.tags = ['AdminUser']

	const { user, password } = req.body;
	const foundUser = await adminUserService.logIn(user, password);
	res.status(STATUS_CODES.OK).send(foundUser);
};

module.exports = {
	logIn
};
