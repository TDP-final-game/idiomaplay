'use strict';

const createChallenge = require('../../../src/startup/createChallenge');

const Challenge = app => {
	this.app = app;
};

Challenge.prototype.create = async () => {
	return JSON.parse(JSON.stringify(await createChallenge()));
};

Challenge.prototype.get = async ({ challengeId }) => {
	return this.app.get(`/challenges/${challengeId}`);
};

Challenge.prototype.list = async () => {
	return this.app.get('/challenges');
};

module.exports = Challenge;
