'use strict';

const ApiError = require('../../apiError');
// const firebase = require('../../startup/firebase');
const STATUS_CODES = require('../../constants/status_codes.json');

const { model: userModel } = require('../../model/users/user');

const authentication = async (req, res, next) => {
	const { authorization } = req.headers;

	// TODO: to be implemented
	// if(authorization) {
	// 	const token = authorization.substring(7, authorization.length);
	// 	try {
	// 		req.user = await firebase.auth().verifyIdToken(token, true);
	// 	} catch(e) {
	// 		return next(new ApiError(ApiError.codes.UNAUTHORIZED, e.message));
	// 	}
	// }


	if(!authorization)
		throw new ApiError(STATUS_CODES.UNAUTHORIZED, 'No authorization token');

	if(!authorization.startsWith('userId '))
		throw new ApiError(STATUS_CODES.UNAUTHORIZED, 'Authorization token malformed');

	const user = await userModel.findOne({ _id: authorization.substring(7) });

	if(!user)
		throw new ApiError(STATUS_CODES.UNAUTHORIZED, 'User not found');

	req.user = user;

	next();
};

module.exports = authentication;
