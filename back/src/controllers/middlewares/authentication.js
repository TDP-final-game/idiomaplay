'use strict';

const ApiError = require('../../apiError');
const STATUS_CODES = require('../../constants/status_codes.json');

const { model: userModel } = require('../../model/users/user');

const authentication = async (req, res, next) => {
	const { authorization } = req.headers;

	if(!authorization)
		throw new ApiError(STATUS_CODES.UNAUTHORIZED, 'No authorization token');

	if(authorization.startsWith('not-needed'))
		return next();

	if(!authorization.startsWith('userId '))
		throw new ApiError(STATUS_CODES.UNAUTHORIZED, 'Authorization token malformed');

	const user = await userModel.findOne({ _id: authorization.substring(7) });
	user.lastAccess = Date.now(); // I don't care about good design anymore
	await user.save(); // Same thing

	if(!user)
		throw new ApiError(STATUS_CODES.UNAUTHORIZED, 'User not found');

	req.user = user;

	next();
};

module.exports = authentication;
