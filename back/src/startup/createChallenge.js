const challengesServices = require('../services/challengeService');
const {model: challengeModel} = require('../model/challenges/challenge');
const challenge = require('./challenge');

module.exports = async () => {
    await challengesServices.deleteChallenges();
    return await challengeModel.create(challenge);
}
