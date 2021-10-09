const {model: userModel} = require('../model/users/user');
const {model: challengeAttemptModel} = require('../model/attempts/challengeAttempt');

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
