'use strict';

const userService = require('../services/users/userService');
const STATUS_CODES = require('../constants/status_codes.json');
const ApiError = require('../apiError');

const listChallengesAttempts = async (req, res) => {
	// #swagger.tags = ['User']

	try {
		const { userId } = req.params;
		
		const response = await userService.listChallengeAttempts(userId);

		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(error.statusCode).send(error.description);
	}
};

const createUser = async (req, res) => {
	// #swagger.tags = ['User']

	const { user } = req;
	
	if(!user)
		throw new ApiError(ApiError.codes.BAD_REQUEST, 'User is required');

	const { firstName, lastName } = req.body;
	res.status(STATUS_CODES.CREATED).send(await userService.createUser({
		email: user.email,
		firstName,
		lastName
	}));
};

const logIn = async (req, res) => {
	// #swagger.tags = ['User']

	const { user } = req;
	const response = await userService.logIn({ email: user.email });
	res.status(STATUS_CODES.OK).send(response);
};

module.exports = {
	listChallengesAttempts,
	createUser,
	logIn
};
