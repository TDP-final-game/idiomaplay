'use strict';

const userService = require('../services/users/userService');
const STATUS_CODES = require('../constants/status_codes.json');

const createUser = async (req, res) => {
	// #swagger.tags = ['User']

	const createdUser = await userService.createUser(req.body);
	res.status(STATUS_CODES.CREATED).send(createdUser);
};

const logIn = async (req, res) => {
	// #swagger.tags = ['User']

	const foundUser = await userService.logIn(req.body);
	res.status(STATUS_CODES.OK).send(foundUser);
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
	listChallengesAttempts,
	getStats
};
