'use strict';

const STATUSES = require('../../constants/statuses.json');


class Status {

	constructor(status) {
		this.status = status;
	}

	isPending() {
		return this.status === STATUSES.PENDING;
	}

	isInProgress() {
		return this.status === STATUSES.IN_PROGRESS;
	}


	isFailed() {
		return this.status === STATUSES.FAILED;
	}

	isPassed() {
		return this.status === STATUSES.PASSED;
	}

	isCompleted() {
		return this.isPassed() || this.isFailed();
	}


	static PENDING() {
		return new Status(STATUSES.PENDING);
	}


	static IN_PROGRESS() {
		return new Status(STATUSES.IN_PROGRESS);
	}


	static FAILED() {
		return new Status(STATUSES.FAILED);
	}

	static PASSED() {
		return new Status(STATUSES.PASSED);
	}


	static AddMethodsToSchema(schema) {
		schema.methods.isPending = function() {
			return this.status.isPending();
		};

		schema.methods.isInProgress = function() {
			return this.status.isInProgress();
		};

		schema.methods.isPassed = function() {
			return this.status.isPassed();
		};

		schema.methods.isFailed = function() {
			return this.status.isFailed();
		};

		schema.methods.isCompleted = function() {
			return this.status.isCompleted();
		};
	}

}

module.exports = Status;
