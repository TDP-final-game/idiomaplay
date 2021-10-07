const challengeAttemptService = require('../services/challengeAttemptService');
const STATUS_CODES = require('../constants/status_codes');

const attemptChallenge = async (req, res) => {
    try {
        const {challengeId, userId} = req.body;
        const response = await challengeAttemptService.attemptChallenge(challengeId, userId);
        res.status(STATUS_CODES.OK).send(response);
    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({message: error.message});
    }
};

const attemptUnit = async (req, res) => {
    try {
        const {challengeAttemptId} = req.params;
        const {orderNumber} = req.body;
        const response = await challengeAttemptService.attemptUnit(challengeAttemptId, orderNumber);
        res.status(STATUS_CODES.OK).send(response);
    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({message: error.message});
    }
};

module.exports = {
    attemptChallenge,
    attemptUnit
};
