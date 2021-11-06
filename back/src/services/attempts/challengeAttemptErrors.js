'use strict';

const ApiError = require('../../apiError');
const STATUS_CODES = require('../../constants/status_codes.json');

module.exports = {
	ChallengeInProgress: () => new ApiError(STATUS_CODES.BAD_REQUEST, 'Challenge already in progress for this user'),
	ChallengeNotFound: () => new ApiError(STATUS_CODES.BAD_REQUEST, 'Challenge not found'),
	ChallengeAttemptNotFound: () => new ApiError(STATUS_CODES.BAD_REQUEST, 'Challenge attempt not found'),
	NotEnoughLives: () => new ApiError(STATUS_CODES.BAD_REQUEST, 'Not enough lives to start this module')
};
