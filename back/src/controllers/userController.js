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
	const userCreated = await userService.createUser({
		email: user.email,
		firstName,
		lastName
	});
	res.status(STATUS_CODES.CREATED).send({ id: userCreated._id });
};

const logIn = async (req, res) => {
	// #swagger.tags = ['User']

	const { user } = req;
	console.log(user)
	const response = await userService.logIn({ email: user.email });
	console.log(response)
	res.status(STATUS_CODES.OK).send({ id: response._id });
};

module.exports = {
	listChallengesAttempts,
	createUser,
	logIn
};
