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

	let user;

	if(authorization) {
		if(authorization.startsWith('userId '))
			user = await userModel.findOne({ id: authorization.startsWith('userId ') });
		else
			user = await userModel.findOne({ email: authorization });
	}

	if(!user)
		throw new ApiError(STATUS_CODES.UNAUTHORIZED, 'User not found');

	req.user = user;

	next();
};

module.exports = authentication;
