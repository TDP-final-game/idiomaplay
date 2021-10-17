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
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const createUser = async (req, res) => {
	try {
		const response = await userService.createUser(req.body);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};


const logIn = async (req, res) => {
	try {
		const response = await userService.logIn(req.body);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

module.exports = {
	listChallengesAttempts,
	createUser, 
	logIn
};
