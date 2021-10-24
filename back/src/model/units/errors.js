'use strict';

const ApiError = require('../../apiError');
const STATUS_CODES = require('../../constants/status_codes.json');

module.exports = {
	LessonNotFound: ({ lessonOrderNumber }) => new ApiError(STATUS_CODES.BAD_REQUEST, `Lesson with order number ${lessonOrderNumber} not found`)
};
