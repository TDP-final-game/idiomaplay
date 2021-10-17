'use strict';

const ApiError = require('../../apiError');
const STATUS_CODES = require('../../constants/status_codes.json');

module.exports = {
	UnitNotFound: ({ unitOrderNumber }) => new ApiError(STATUS_CODES.BAD_REQUEST, `Unit with order number ${unitOrderNumber} not found`)
};
