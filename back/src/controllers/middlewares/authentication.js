'use strict';

// const firebase = require('../../startup/firebase');
// const ApiError = require('../../apiError');

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

	if(authorization) {
		if(authorization.startsWith('userId '))
			req.user = { id: authorization.substring(7) };
		else {
			const userId = await userModel.findOne({ email: authorization });
			req.user = { id: userId };
		}
	}

	next();
};

module.exports = authentication;
