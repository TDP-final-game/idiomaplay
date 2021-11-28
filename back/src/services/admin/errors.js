'use strict';

const ApiError = require('../../apiError');

module.exports = {
	UserAlreadyRegistered: () => new ApiError(ApiError.codes.CONFLICT, 'User already registered'),
	UserNotRegistered: () => new ApiError(ApiError.codes.UNAUTHORIZED, 'User not registered')
};
