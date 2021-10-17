'use strict';

const challengeService = require('../services/challengeService');
const STATUS_CODES = require('../constants/status_codes.json');

const findChallenge = async (req, res) => {
	// #swagger.tags = ['Challenge']

	try {
		const { challengeId } = req.params;
		const response = await challengeService.findChallenge(challengeId);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const createChallenge = async (req, res) => {
	// #swagger.tags = ['Challenge']

	try {
		const response = await challengeService.createChallenge(req.body);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const listChallenges = async (req, res) => {
	// #swagger.tags = ['Challenge']

	try {
		const response = await challengeService.listChallenges(req.body);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const addUnit = async (req, res) => {
	// #swagger.tags = ['Challenge']

	try {
		const { challengeId } = req.params;
		const response = await challengeService.addUnit(challengeId, req.body);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const addLesson = async (req, res) => {
	// #swagger.tags = ['Challenge']

	try {
		const { challengeId, unitOrderNumber } = req.params;
		const response = await challengeService.addLesson(challengeId, Number(unitOrderNumber), req.body);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const addExam = async (req, res) => {
	// #swagger.tags = ['Challenge']

	try {
		const { challengeId, unitOrderNumber } = req.params;
		const response = await challengeService.addExam(challengeId, Number(unitOrderNumber), req.body);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const getExam = async (req, res) => {
	// #swagger.tags = ['Challenge']

	try {
		const { challengeId, unitOrderNumber } = req.params;
		const response = await challengeService.getExam(challengeId, Number(unitOrderNumber));
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const addExerciseToLesson = async (req, res) => {
	// #swagger.tags = ['Challenge']

	try {
		const { challengeId, unitOrderNumber, lessonOrderNumber } = req.params;
		const response = await challengeService.addExerciseToLesson(challengeId, Number(unitOrderNumber), Number(lessonOrderNumber), req.body);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const addExerciseToExam = async (req, res) => {
	// #swagger.tags = ['Challenge']

	try {
		const { challengeId, unitOrderNumber } = req.params;
		const response = await challengeService.addExerciseToExam(challengeId, Number(unitOrderNumber), req.body);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const listChallengeAttempts = async (req, res) => {
	// #swagger.tags = ['Challenge']

	try {
		const { challengeId } = req.params;
		const response = await challengeService.listChallengeAttempts(challengeId);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

module.exports = {
	findChallenge,
	createChallenge,
	listChallenges,
	addUnit,
	addLesson,
	addExam,
	getExam,
	addExerciseToLesson,
	addExerciseToExam,
	listChallengeAttempts
};
