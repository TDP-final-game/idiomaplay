const challengesServices = require('../services/challengesService');
const STATUS_CODES = require('../utils/status_codes');

const findChallenge = async (req, res) => {
	// #swagger.tags = ['Challenge']

	try {
		const { challengeId } = req.params;
		const response = await challengesServices.findChallenge(challengeId);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const createChallenge = async (req, res) => {
	// #swagger.tags = ['Challenge']

	try {
		const response = await challengesServices.createChallenge(req.body);
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
		const response = await challengesServices.addUnit(challengeId, req.body);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const addLesson = async (req, res) => {
	// #swagger.tags = ['Challenge']

	try {
		const { challengeId, unitId } = req.params;
		console.log(challengeId, unitId)
		const response = await challengesServices.addLesson(challengeId, parseInt(unitId, 10), req.body);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const addExam = async (req, res) => {
	// #swagger.tags = ['Challenge']

	try {
		const { challengeId, unitId } = req.params;
		const response = await challengesServices.addExam(challengeId, parseInt(unitId, 10), req.body);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const addExerciseToLesson = async (req, res) => {
	// #swagger.tags = ['Challenge']

	try {
		const { challengeId, unitId, lessonId } = req.params;
		const response = await challengesServices.addExerciseToLesson(challengeId, parseInt(unitId, 10), parseInt(lessonId, 10), req.body);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const addExerciseToExam = async (req, res) => {
	// #swagger.tags = ['Challenge']

	try {
		const { challengeId, unitId } = req.params;
		const response = await challengesServices.addExerciseToExam(challengeId, parseInt(unitId, 10), req.body);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

module.exports = { 
  findChallenge,
  createChallenge,
  addUnit,
  addLesson,
  addExam,
  addExerciseToLesson,
  addExerciseToExam
 };
