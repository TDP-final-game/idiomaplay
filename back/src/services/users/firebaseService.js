'use strict';

const ApiError = require('../../apiError');

const admin = require('../../startup/firebase')();

const getUserInformation = async token => {
	try {
		const userInformation = await admin.auth().verifyIdToken(token);
		return userInformation;
	} catch(error) {
		// TODO: REFACTOR THIS
		throw new ApiError(500, error.errorInfo);
	}
};

module.exports = {
	getUserInformation
};
