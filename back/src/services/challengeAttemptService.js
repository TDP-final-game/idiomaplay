const mongoose = require('mongoose');
const Challenge = require('../schemas/challenges/challenge');
const ChallengeAttempt = require('../schemas/attempts/challengeAttempt');

const {pageSize} = require('../constants/pagination_default.json');
const STATUSES = require("../constants/statuses");

const challengeModel = mongoose.model('challenge', Challenge);
const challengeAttemptModel = mongoose.model('challengeAttempt', ChallengeAttempt);

const attemptChallenge = async (challengeId, userId) => {
    const attemptsInProgress = await challengeAttemptModel.find({challengeId: challengeId, userId: userId, status: STATUSES.IN_PROGRESS});
    if (attemptsInProgress.length !== 0) {
        throw Error('Ya tenes este desafio en curso'); // todo: refactor por exceptions
    }

    const challenge = await challengeModel.findOne({_id: challengeId});
    //const minOrderNumber = Math.min(...challenge.units.map(unit => unit.unitInfo.orderNumber));
    const unitsAttempts = challenge.units.map(unit => {
        return {
            unitInfo: unit.unitInfo,
            //status: unit.unitInfo.orderNumber === minOrderNumber ? STATUSES.IN_PROGRESS : STATUSES.PENDING
        };
    });

    return challengeAttemptModel.create({
        userId,
        challengeInfo: challenge.challengeInfo,
        challengeId: challenge._id,
        unitsAttempts: unitsAttempts
    });
};

module.exports = {
    attemptChallenge
};
