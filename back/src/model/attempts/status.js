const STATUSES = require('../../constants/statuses.json');

function Status(status) {
  this.status = status
}

Status.prototype.isPending = function() {
  return this.status === STATUSES.PENDING;
};

Status.prototype.isInProgress = function() {
  return this.status === STATUSES.IN_PROGRESS;
};

Status.prototype.isFailed = function() {
  return this.status === STATUSES.FAILED;
};

Status.prototype.isPassed = function() {
  return this.status === STATUSES.PASSED;
};

Status.prototype.isCompleted = function() {
  return this.isPassed() || this.isFailed();
};

Status.prototype.value = function() {
  return this.status;
};

Status.prototype.toString = function() {
  return this.value();
};

Status.prototype.toJSON = function() {
  return this.value();
};

Status.PENDING = function () {
  return new Status(STATUSES.PENDING)
}

Status.IN_PROGRESS = function () {
  return new Status(STATUSES.IN_PROGRESS)
}

Status.FAILED = function () {
  return new Status(STATUSES.FAILED)
}

Status.PASSED = function () {
  return new Status(STATUSES.PASSED)
}

Status.AddMethodsToSchema = function (schema) {
  schema.methods.isPending = function () {
    return this.status.isPending()
  }

  schema.methods.isInProgress = function () {
    return this.status.isInProgress()
  }

  schema.methods.isPassed = function () {
    return this.status.isPassed()
  }

  schema.methods.isFailed = function () {
    return this.status.isFailed()
  }

  schema.methods.isCompleted = function () {
    return this.status.isCompleted()
  }
}

module.exports = Status;
