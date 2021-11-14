'use strict';

const adminUserService = require('../services/admin/adminService');
const STATUS_CODES = require('../constants/status_codes.json');

const createUser = async (req, res) => {
	// #swagger.tags = ['AdminUser']

	const { email, password } = req.body;
	const createdUser = await adminUserService.createUser(email, password);
	res.status(STATUS_CODES.CREATED).send(createdUser);
};

const logIn = async (req, res) => {
	// #swagger.tags = ['AdminUser']

	const { email, password } = req.body;
	const foundUser = await adminUserService.logIn(email, password);
	res.status(STATUS_CODES.OK).send(foundUser);
};

const list = async (req, res) => {
	// #swagger.tags = ['AdminUser']
	const users = await adminUserService.list();
	res.status(STATUS_CODES.OK).send(users);
};

module.exports = {
	createUser,
	logIn,
	list
};
