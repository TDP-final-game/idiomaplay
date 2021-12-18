'use strict';

const challengeService = require('../services/challenges/challengeService');
const STATUS_CODES = require('../constants/status_codes.json');

const findChallenge = async (req, res) => {
	// #swagger.tags = ['Challenge']

	try {
		const { challengeId } = req.params;
		const response = await challengeService.findChallenge(challengeId);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(error.statusCode).send(error.description);
	}
};

const createChallenge = async (req, res) => {
	// #swagger.tags = ['Challenge']

	try {
		const response = await challengeService.createChallenge(req.body);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(error.statusCode).send(error.description);
	}
};

const listChallenges = async (req, res) => {
	// #swagger.tags = ['Challenge']

	try {
		const response = await challengeService.listChallenges(req.query);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(error.statusCode).send(error.description);
	}
};

const deleteChallenge = async (req, res) => {
	try {
		const response = await challengeService.deleteChallenge(req.params.challengeId);
		res.status(STATUS_CODES.OK).send(response);
	} catch(error) {
		return res.status(error.statusCode).send(error.description);
	}
}

const getUnits = async (req, res) => {
	// #swagger.tags = ['Challenge']

	try {
		const { challengeId } = req.params;
		const { units } = await challengeService.findChallenge(challengeId);
		res.status(STATUS_CODES.OK).send(units);
	} catch(error) {
		return res.status(error.statusCode).send(error.description);
	}
};

const getUnit = async (req, res) => {
	// #swagger.tags = ['Challenge']

	try {
		const { challengeId, unitOrderNumber } = req.params;
		const challenge = await challengeService.findChallenge(challengeId);
		const unit = challenge.getUnit(parseInt(unitOrderNumber, 10));
		res.status(STATUS_CODES.OK).send(unit);
	} catch(error) {
		return res.status(error.statusCode).send(error.description);
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
		return res.status(error.statusCode).send(error.description);
	}
};

const getLessons = async (req, res) => {
	// #swagger.tags = ['Challenge']

	try {
		const { challengeId, unitOrderNumber } = req.params;
		const challenge = await challengeService.findChallenge(challengeId);
		const unit = challenge.getUnit(parseInt(unitOrderNumber, 10));
		res.status(STATUS_CODES.OK).send(unit.lessons);
	} catch(error) {
		return res.status(error.statusCode).send(error.description);
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
		return res.status(error.statusCode).send(error.description);
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
		return res.status(error.statusCode).send(error.description);
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
		return res.status(error.statusCode).send(error.description);
	}
};

const getLesson = async (req, res) => {
	// #swagger.tags = ['Challenge']

	try {
		const { challengeId, unitOrderNumber, lessonOrderNumber } = req.params;
		const challenge = await challengeService.findChallenge(challengeId);
		const unit = challenge.getUnit(parseInt(unitOrderNumber, 10));
		const lesson = unit.getLesson(parseInt(lessonOrderNumber, 10));
		res.status(STATUS_CODES.OK).send(lesson);
	} catch(error) {
		return res.status(error.statusCode).send(error.description);
	}
};

const getLessonExercises = async (req, res) => {
	// #swagger.tags = ['Challenge']

	try {
		const { challengeId, unitOrderNumber, lessonOrderNumber } = req.params;
		const challenge = await challengeService.findChallenge(challengeId);
		const unit = challenge.getUnit(parseInt(unitOrderNumber, 10));
		const lesson = unit.getLesson(parseInt(lessonOrderNumber, 10));
		res.status(STATUS_CODES.OK).send(lesson.exercises);
	} catch(error) {
		return res.status(error.statusCode).send(error.description);
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
		return res.status(error.statusCode).send(error.description);
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
		return res.status(error.statusCode).send(error.description);
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
		return res.status(error.statusCode).send(error.description);
	}
};

const getLessonExercise = async (req, res) => {
	// #swagger.tags = ['Challenge']

	try {
		const { challengeId, unitOrderNumber, lessonOrderNumber, exerciseNumber } = req.params;
		const challenge = await challengeService.findChallenge(challengeId);
		const unit = challenge.getUnit(parseInt(unitOrderNumber, 10));
		const lesson = unit.getLesson(parseInt(lessonOrderNumber, 10));
		const exercise = lesson.exercises[parseInt(exerciseNumber, 10)];
		res.status(STATUS_CODES.OK).send(exercise);
	} catch(error) {
		return res.status(error.statusCode).send(error.description);
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
	listChallengeAttempts,
	getUnits,
	getLessons,
	getLessonExercises,
	getLesson,
	getLessonExercise,
	getUnit,
	deleteChallenge
};
