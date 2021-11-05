'use strict';

const userService = require('../services/users/userService');
const STATUS_CODES = require('../constants/status_codes.json');
const ApiError = require('../apiError');

const createUser = async (req, res) => {
	// #swagger.tags = ['User']

	const { user } = req;

	if(!user)
		throw new ApiError(ApiError.codes.BAD_REQUEST, 'User is required');

	const { firstName, lastName } = req.body;
	const createdUser = await userService.createUser({
		email: user.email,
		firstName,
		lastName
	});
	res.status(STATUS_CODES.CREATED).send(createdUser);
};

const logIn = async (req, res) => {
	// #swagger.tags = ['User']

	const { user } = req;
	const foundUser = await userService.logIn({ email: user.email });
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
