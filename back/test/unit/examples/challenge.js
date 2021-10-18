'use strict';

const challenge = require('../../../src/startup/challenge');
const { model: Challenge } = require('../../../src/model/challenges/challenge');

class ChallengeExample {

	static new() {
		return new ChallengeExample();
	}

	build() {
		return new Challenge(challenge);
	}
}

module.exports = ChallengeExample;
