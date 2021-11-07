'use strict';

const challengeAttemptService = require('../services/attempts/challengeAttemptService');
const STATUS_CODES = require('../constants/status_codes.json');

const attemptChallenge = async (req, res) => {
	try {
		const { user } = req;
		const { challengeId } = req.body;
		const response = await challengeAttemptService.attemptChallenge(challengeId, user._id);
		res.status(STATUS_CODES.OK).send(response);
	} catch(error) {
		console.log(error);
		return res.status(error.statusCode).send(error.description);
	}
};

const attemptUnit = async (req, res) => {
	try {
		const { challengeAttemptId } = req.params;
		const { unitOrderNumber } = req.body;
		const response = await challengeAttemptService.attemptUnit(challengeAttemptId, parseInt(unitOrderNumber, 10));
		res.status(STATUS_CODES.OK).send(response);
	} catch(error) {
		return res.status(error.statusCode).send(error.description);
	}
};

const attemptExam = async (req, res) => {
	try {
		const { challengeAttemptId, unitOrderNumber } = req.params;
		const response = await challengeAttemptService.attemptExam(challengeAttemptId, parseInt(unitOrderNumber, 10));
		res.status(STATUS_CODES.OK).send(response);
	} catch(error) {
		return res.status(error.statusCode).send(error.description);
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
		return res.status(error.statusCode).send(error.description);
	}
};


const attemptLessonResult = async (req, res) => {
	try {
		const { challengeAttemptId, unitOrderNumber, lessonOrderNumber} = req.params;
		const response = await challengeAttemptService
			.attemptLessonResult(challengeAttemptId, parseInt(unitOrderNumber, 10), parseInt(lessonOrderNumber, 10));
		res.status(STATUS_CODES.OK).send(response);
	} catch(error) {
		console.log(error);
		return res.status(error.statusCode).send(error.description);
	}
};

const attemptExamResult = async (req, res) => {
	try {
		const { challengeAttemptId, unitOrderNumber } = req.params;
		const response = await challengeAttemptService
			.attemptExamResult(challengeAttemptId, parseInt(unitOrderNumber, 10));
		res.status(STATUS_CODES.OK).send(response);
	} catch(error) {
		return res.status(error.statusCode).send(error.description);
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
		return res.status(error.statusCode).send(error.description);
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
		return res.status(error.statusCode).send(error.description);
	}
};

const getChallenge = async (req, res) => {
	try {
		const { challengeAttemptId } = req.params;
		const response = await challengeAttemptService.getChallenge(challengeAttemptId);
		res.status(STATUS_CODES.OK).send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const getUnit = async (req, res) => {
	try {
		const { challengeAttemptId, unitOrderNumber } = req.params;
		const response = (await challengeAttemptService.getChallenge(challengeAttemptId)).getUnitAttempt(parseInt(unitOrderNumber, 10));
		res.status(STATUS_CODES.OK).send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const getLesson = async (req, res) => {
	try {
		const { challengeAttemptId, unitOrderNumber, lessonOrderNumber } = req.params;
		const response = (await challengeAttemptService.getChallenge(challengeAttemptId)).getUnitAttempt(parseInt(unitOrderNumber, 10))
			.getLessonAttempt(parseInt(lessonOrderNumber, 10));
		res.status(STATUS_CODES.OK).send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const getExam = async (req, res) => {
	try {
		const { challengeAttemptId, unitOrderNumber } = req.params;
		const response = (await challengeAttemptService.getChallenge(challengeAttemptId)).getUnitAttempt(parseInt(unitOrderNumber, 10)).examAttempt;
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
	attemptLessonExercise,
	attemptLessonResult,
	attemptExamResult,
	getChallenge,
	getUnit,
	getLesson,
	getExam
};
