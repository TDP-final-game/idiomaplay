'use strict';

const mongoose = require('mongoose');

const lessonInfo = require('./lessonInfo');
const { schema: Exercise } = require('../exercises/exercise');
const { model: LessonAttempt } = require('../attempts/lessonAttempt');

/*
 * Schema
 */
const Lesson = new mongoose.Schema({
	_id: false,
	...lessonInfo,
	exercises: [{ type: Exercise, required: false }]
});

/*
 * Instance methods
 */
Lesson.methods.newAttempt = function() {
	return new LessonAttempt({
		...this.toObject()
	});
};

/*
 * Exports
 */
module.exports = {
	schema: Lesson
};
