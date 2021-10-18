'use strict';

class ApiError extends Error {
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
