'use strict';

const challengesServices = require('../services/challenges/challengeService');
const { model: challengeModel } = require('../model/challenges/challenge');
const challenge = require('./challenge');

module.exports = async () => {
	await challengesServices.deleteChallenges();
	return challengeModel.create(challenge);
};
