'use strict';

class ApiError {
	constructor(status, description, error) {
		this.status = status;
		this.description = description;
		this.error = error;
	}

	get status() {
		return this.status;
	}

	get messsage() {
		return { statusCode: this.status, description: this.description, causedBy: this.error };
	}


}

module.exports = ApiError;
