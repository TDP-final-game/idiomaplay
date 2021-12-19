'use strict';

const ApiError = require('../../apiError');
const STATUS_CODES = require('../../constants/status_codes.json');

module.exports = {
    ChallengeNotDeletable: message => new ApiError(STATUS_CODES.BAD_REQUEST, message),
    UnitNotDeletable: message => new ApiError(STATUS_CODES.BAD_REQUEST, message),
};
