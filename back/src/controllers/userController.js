'use strict';

const userService = require('../services/userService');
const STATUS_CODES = require('../constants/status_codes.json');

const listChallengesAttempts = async (req, res) => {
	// #swagger.tags = ['User']

	try {
		const { userId } = req.params;
		const response = await userService.listChallengeAttempts(userId);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(error.getStatus()).send(error.getMessage());
	}
};

const createUser = async (req, res) => {
	try {
		const { accessToken } = req.body;
		const response = await userService.createUser(accessToken);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(error.getStatus()).send(error.getMessage());
	}
};

const logIn = async (req, res) => {
	try {
		const { accessToken } = req.body;
		const response = await userService.logIn(accessToken);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(error.getStatus()).send(error.getMessage());
	}
};

module.exports = {
	listChallengesAttempts,
	createUser,
	logIn
};
