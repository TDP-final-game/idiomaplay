'use strict';

const userService = require('../services/users/userService');
const STATUS_CODES = require('../constants/status_codes.json');

const createUser = async (req, res) => {
	// #swagger.tags = ['User']

	const lastLoginDate = new Date();
	const createdUser = await userService.createUser({ ...req.body, lastLoginDate });
	res.status(STATUS_CODES.CREATED).send(createdUser);
};

const logIn = async (req, res) => {
	// #swagger.tags = ['User']

	const lastLoginDate = new Date();
	const foundUser = await userService.logIn({ ...req.body, lastLoginDate });
	res.status(STATUS_CODES.OK).send(foundUser);
};

const logOut = async (req, res) => {
	// #swagger.tags = ['User']

	const lastLoginDate = new Date();
	const foundUser = await userService.logOut({ ...req.body, lastLoginDate });
	res.status(STATUS_CODES.OK).send(foundUser);
};


const list = async (req, res) => {
	// #swagger.tags = ['User']

	const users = await userService.list();
	res.status(STATUS_CODES.OK).send(users);
};

const get = async (req, res) => {
	// #swagger.tags = ['User']

	const { userId } = req.params;
	const user = await userService.get(userId);
	res.status(STATUS_CODES.OK).send(user);
};

const update = async (req, res) => {
	// #swagger.tags = ['User']

	const { userId } = req.params;
	const user = await userService.update({ ...req.body, id: userId });
	res.status(STATUS_CODES.OK).send(user);
};

const listChallengesAttempts = async (req, res) => {
	// #swagger.tags = ['User']

	try {
		const { user } = req;

		const response = await userService.listChallengeAttempts(user._id);

		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(error.statusCode).send(error.description);
	}
};

const getStats = async (req, res) => {
	// #swagger.tags = ['User']
	const { user } = req;
	const stats = await userService.getStats({ userId: user._id });
	res.status(STATUS_CODES.OK).send(stats);
};

module.exports = {
	createUser,
	logIn,
	logOut,
	list,
	get,
	update,
	listChallengesAttempts,
	getStats
};
