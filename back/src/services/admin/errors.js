'use strict';

const ApiError = require('../../apiError');

module.exports = {
	UserNotRegistered: () => new ApiError(ApiError.codes.UNAUTHORIZED, 'Usuario no registrado')
};
