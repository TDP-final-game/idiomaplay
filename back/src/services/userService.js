const ChallengeAttempt = require('../schemas/attempts/challengeAttempt');
const mongoose = require('mongoose');

const challengeAttemptModel = mongoose.model('challengeAttempt', ChallengeAttempt);

const listChallengeAttempts = userId => {
    return challengeAttemptModel.find({ userId: userId });
};

module.exports = {
    listChallengeAttempts
};
