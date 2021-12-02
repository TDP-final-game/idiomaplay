'use strict';

const errors = require('./errors');

const logIn = async (user, password) => {
	if((user === process.env.ADMIN_USER) && (password === process.env.ADMIN_PASSWORD))
		return { user, password };

	throw errors.UserNotRegistered();
};

module.exports = {
	logIn
};
