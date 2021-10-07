const mongoose = require('mongoose');
const Challenge = require('../schemas/challenges/challenge');
const ChallengeAttempt = require('../schemas/attempts/challengeAttempt');

const {pageSize} = require('../constants/pagination_default.json');
const STATUSES = require("../constants/statuses");

const challengeModel = mongoose.model('challenge', Challenge);
const challengeAttemptModel = mongoose.model('challengeAttempt', ChallengeAttempt);

const attemptChallenge = async (challengeId, userId) => {
    const attemptsInProgress = await challengeAttemptModel.find({challengeId: challengeId, userId: userId, status: STATUSES.IN_PROGRESS});
    if (attemptsInProgress.length !== 0) throw Error('Challenge already in progress'); // todo: use exceptions

    const challenge = await challengeModel.findOne({_id: challengeId});
    if (!challenge) throw Error('Challenge not found');
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

const attemptUnit = async (challengeAttemptId, userId, unitOrderNumber) => {

};

module.exports = {
    attemptChallenge,
    attemptUnit
};
