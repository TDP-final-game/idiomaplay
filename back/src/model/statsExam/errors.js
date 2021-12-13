'use strict';

const ApiError = require('../../apiError');
const STATUS_CODES = require('../../constants/status_codes.json');

module.exports = {
	DayNotFound: ({ day }) => new ApiError(STATUS_CODES.BAD_REQUEST, `StatsExam with day ${day} not found`)
};
