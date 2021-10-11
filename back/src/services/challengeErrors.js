'use strict';

const factory = require('../errorFactory');

module.exports = {
	ChallengeInProgress: () => factory('ChallengeInProgress')('Challenge already in progress for this user'),
	ChallengeNotFound: () => factory('ChallengeNotFound')('Challenge not found'),
	ChallengeAttemptNotFound: () => factory('ChallengeAttemptNotFound')('Challenge attempt not found')
};
