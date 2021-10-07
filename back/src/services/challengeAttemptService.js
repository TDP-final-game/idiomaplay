const mongoose = require('mongoose');
const Challenge = require('../schemas/challenges/challenge');
const ChallengeAttempt = require('../schemas/attempts/challengeAttempt');

const {pageSize} = require('../constants/pagination_default.json');
const STATUSES = require("../constants/statuses");

const challengeModel = mongoose.model('challenge', Challenge);
const challengeAttemptModel = mongoose.model('challengeAttempt', ChallengeAttempt);

const attemptChallenge = async (challengeId, userId) => {
    const attemptsInProgress = await challengeAttemptModel.find({challengeId: challengeId, userId: userId, status: STATUSES.IN_PROGRESS});
    if (attemptsInProgress.length !== 0) throw Error('Challenge already in progress'); // todo: avoid using generic error

    const challenge = await challengeModel.findOne({_id: challengeId});
    if (!challenge) throw Error('Challenge not found');

    const unitsAttempts = challenge.units.map(unit => ({ unitInfo: unit.unitInfo }));

    return challengeAttemptModel.create({
        userId,
        challengeInfo: challenge.challengeInfo,
        challengeId: challenge._id,
        unitsAttempts: unitsAttempts
    });
};

const attemptUnit = async (challengeAttemptId, unitOrderNumber) => {
    const attemptsInProgress = await challengeAttemptModel.find({_id: challengeAttemptId, status: STATUSES.IN_PROGRESS});
    if (attemptsInProgress.length === 0) throw Error('Challenge attempt is not in progress'); // todo: avoid using generic error

    const challengeAttempt = attemptsInProgress[0];
    const challenge = await challengeModel.findOne({_id: challengeAttempt.challengeId});
    
    const lessons = challenge.units.find(unit => unit.unitInfo.orderNumber === unitOrderNumber)?.lessons
    if (!lessons) throw Error('Unit order number not found'); // todo: avoid using generic error

    const addLessonsAttempts = function (unitAttempt) {
        unitAttempt.lessonsAttempts = lessons.map(lesson => ({lessonInfo: lesson.lessonInfo}));
    };

    // todo si tiene alguna unidad in progress fallar diciendo q ya tiene una unidad en progreso
    // todo si no tiene ninguna unidad in progress validar si la unit order number que quiere arrancar es la
    //  siguiente a la ultima que esta en estado PASSED, secuencialidad necesaria??
    challengeAttempt.unitsAttempts.forEach(unitAttempt => {
        if (unitAttempt.unitInfo.orderNumber === unitOrderNumber) {
            unitAttempt.status = STATUSES.IN_PROGRESS;
            addLessonsAttempts(unitAttempt);
        }
    });

    return challengeAttempt.save();
};

module.exports = {
    attemptChallenge,
    attemptUnit
};
