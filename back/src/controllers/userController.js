const userServices = require('../services/userService');
const STATUS_CODES = require('../utils/status_codes');

// TODO: remove this
const USER_ID = '61553000155f46e004a252c4';

const startChallenge = async (req, res) => {
	// #swagger.tags = ['User challenge']

	try {
		const { challengeId } = req.params;
		const response = await userServices.startChallenge(challengeId, USER_ID);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const startUnit = async (req, res) => {
	// #swagger.tags = ['User challenge']

	try {
        const { challengeId } = req.params;
		const response = await userServices.startUnit(challengeId);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const startLesson = async (req, res) => {
	// #swagger.tags = ['User challenge']

	try {
		const { challengeId } = req.params;
		const response = await userServices.startLesson(challengeId);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const getExerciseToComplete = async (req, res) => {
	// #swagger.tags = ['User challenge']

	try {
		const { challengeId } = req.params;
		const response = await userServices.getExerciseToComplete(challengeId);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

const saveUserExerciseSolution = async (req, res) => {
	// #swagger.tags = ['User challenge']

	try {
		const { challengeId, exerciseId } = req.params;
		const response = await userServices.saveUserExerciseSolution(challengeId, exerciseId);
		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
	}
};

module.exports = { 
  startChallenge,
  startUnit,
  startLesson,
  getExerciseToComplete,
  saveUserExerciseSolution,
 };
