const User = require('../model/users/user');
const ChallengeAttempt = require('../model/attempts/challengeAttempt');
const mongoose = require('mongoose');

const challengeAttemptModel = mongoose.model('challengeAttempt', ChallengeAttempt);
const userModel = mongoose.model('userModel', User);

const createUser = (user) => {
    return userModel.create(user);
}

const listChallengeAttempts = userId => {
    return challengeAttemptModel.find({ userId: userId });
};

module.exports = {
    listChallengeAttempts,
    createUser
};
