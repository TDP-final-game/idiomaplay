'use strict';

const challengeAttemptService = require('../services/challengeAttemptService');
const STATUS_CODES = require('../constants/status_codes.json');

const USER_ID = '6161bbb002bf6b116530d717';

const attemptChallenge = async (req, res) => {
	try {
		const { challengeId, userId = USER_ID } = req.body;
		const response = await challengeAttemptService.attemptChallenge(challengeId, userId);
		res.status(STATUS_CODES.OK).send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const attemptUnit = async (req, res) => {
	try {
		const { challengeAttemptId } = req.params;
		const { unitOrderNumber } = req.body;
		const response = await challengeAttemptService.attemptUnit(challengeAttemptId, parseInt(unitOrderNumber, 10));
		res.status(STATUS_CODES.OK).send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const attemptExam = async (req, res) => {
	try {
		const { challengeAttemptId, unitOrderNumber } = req.params;
		const response = await challengeAttemptService.attemptExam(challengeAttemptId, parseInt(unitOrderNumber, 10));
		res.status(STATUS_CODES.OK).send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const attemptLesson = async (req, res) => {
	try {
		const { challengeAttemptId, unitOrderNumber } = req.params;
		const { lessonOrderNumber } = req.body;
		const response = await challengeAttemptService
			.attemptLesson(challengeAttemptId, parseInt(unitOrderNumber, 10), parseInt(lessonOrderNumber, 10));
		res.status(STATUS_CODES.OK).send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const attemptExamExercise = async (req, res) => {
	try {
		const { challengeAttemptId, unitOrderNumber } = req.params;
		const { exerciseOrderNumber, answer } = req.body;
		const response = await challengeAttemptService
			.attemptExamExercise(challengeAttemptId, parseInt(unitOrderNumber, 10), parseInt(exerciseOrderNumber, 10), answer);
		res.status(STATUS_CODES.OK).send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const attemptLessonExercise = async (req, res) => {
	try {
		const { challengeAttemptId, unitOrderNumber, lessonOrderNumber } = req.params;
		const { exerciseOrderNumber, answer } = req.body;
		const response = await challengeAttemptService.attemptLessonExercise(challengeAttemptId,
			parseInt(unitOrderNumber, 10), parseInt(lessonOrderNumber, 10), parseInt(exerciseOrderNumber, 10), answer);
		res.status(STATUS_CODES.OK).send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

module.exports = {
	attemptChallenge,
	attemptUnit,
	attemptExam,
	attemptLesson,
	attemptExamExercise,
	attemptLessonExercise
};
