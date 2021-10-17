'use strict';

const createChallenge = require('../../../src/startup/createChallenge');

class Challenge {

	constructor(app) {
		this.app = app;
	}

	async create() {
		return JSON.parse(JSON.stringify(await createChallenge()));
	}

	async get({ challengeId }) {
		return this.app.get(`/challenges/${challengeId}`);
	}

	async list() {
		return this.app.get('/challenges');
	}
}

module.exports = Challenge;
