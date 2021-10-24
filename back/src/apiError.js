'use strict';

const statusCodes = require('./constants/status_codes.json');

class ApiError extends Error {
	static codes = statusCodes;

	constructor(status, message) {
		super(message);
		this.message = message;
		this.statusCode = status;
	}

	get description() {
		return { statusCode: this.statusCode, message: this.message };
	}
}

module.exports = ApiError;
