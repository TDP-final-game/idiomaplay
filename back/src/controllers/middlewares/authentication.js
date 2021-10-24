'use strict';

const firebase = require('../../startup/firebase');
const ApiError = require('../../apiError');

const authentication = async (req, res, next) => {
	const { authorization } = req.headers;
	if(authorization) {
		const token = authorization.substring(7, authorization.length);
		try {
			req.user = await firebase.auth().verifyIdToken(token, true);
		} catch(e) {
			return next(new ApiError(ApiError.codes.UNAUTHORIZED, e.message));
		}
	}
	next();
};

module.exports = authentication;
