'use strict';

const factory = require('../../errorFactory');

module.exports = {
	LessonNotFound: ({ lessonOrderNumber }) => factory('LessonNotFound')(`Lesson with order number ${lessonOrderNumber} not found`)
};
