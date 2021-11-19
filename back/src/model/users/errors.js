'use strict';

const ApiError = require('../../apiError');

module.exports = {
	NotEnoughCoins: () => new ApiError(ApiError.codes.BAD_REQUEST, 'Not enough coins to exchange for a live'),
	MaxLivesAlreadyReached: () => new ApiError(ApiError.codes.BAD_REQUEST, 'Max lives already reached')
};
