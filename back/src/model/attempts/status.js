'use strict';

const STATUSES = require('../../constants/statuses.json');

const Status = status => {
	this.status = status;
};

Status.prototype.isPending = () => {
	return this.status === STATUSES.PENDING;
};

Status.prototype.isInProgress = () => {
	return this.status === STATUSES.IN_PROGRESS;
};

Status.prototype.isFailed = () => {
	return this.status === STATUSES.FAILED;
};

Status.prototype.isPassed = () => {
	return this.status === STATUSES.PASSED;
};

Status.prototype.isCompleted = () => {
	return this.isPassed() || this.isFailed();
};

Status.prototype.value = () => {
	return this.status;
};

Status.prototype.toString = () => {
	return this.value();
};

Status.prototype.toJSON = () => {
	return this.value();
};

Status.PENDING = () => {
	return new Status(STATUSES.PENDING);
};

Status.IN_PROGRESS = () => {
	return new Status(STATUSES.IN_PROGRESS);
};

Status.FAILED = () => {
	return new Status(STATUSES.FAILED);
};

Status.PASSED = () => {
	return new Status(STATUSES.PASSED);
};

Status.AddMethodsToSchema = schema => {
	schema.methods.isPending = () => {
		return this.status.isPending();
	};

	schema.methods.isInProgress = () => {
		return this.status.isInProgress();
	};

	schema.methods.isPassed = () => {
		return this.status.isPassed();
	};

	schema.methods.isFailed = () => {
		return this.status.isFailed();
	};

	schema.methods.isCompleted = () => {
		return this.status.isCompleted();
	};
};

module.exports = Status;
