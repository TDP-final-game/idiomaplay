'use strict';

const mongoose = require('mongoose');

const unitInfo = require('../units/unitInfo');
const { schema: LessonAttempt } = require('./lessonAttempt');
const { schema: ExamAttempt } = require('./examAttempt');
const errors = require('./errors');
const Status = require('./status');

/*
 * Schema
 */
const UnitAttempt = new mongoose.Schema({
	_id: false,
	...unitInfo,
	lessonsAttempts: [{ type: LessonAttempt, required: false }],
	examAttempt: { type: ExamAttempt, required: false }
}, { autoCreate: false, toObject: { virtuals: true }, toJSON: { virtuals: true } });

/*
 * Instance methods
 */
UnitAttempt.virtual('status').get(function() {
	if(!this.lessonsAttempts || this.lessonsAttempts.length === 0)
		return Status.PENDING();
	if(this.lessonsAttempts.every(lesson => lesson.isPassed()) && this.examAttempt.isPassed())
		return Status.PASSED();
	return Status.IN_PROGRESS();
});

Status.AddMethodsToSchema(UnitAttempt);

UnitAttempt.methods.attempt = function() {
	const { challenge } = this.ownerDocument();
	const { lessons, exam } = challenge.getUnit(this.orderNumber);

	this.lessonsAttempts = lessons.map(lesson => lesson.newAttempt());
	this.examAttempt = exam.newAttempt();
};

// Lessons
UnitAttempt.methods.getLessonAttempt = function(lessonOrderNumber) {
	const lesson = this.lessonsAttempts.find(lessonAttempt => lessonAttempt.orderNumber === lessonOrderNumber);
	if(!lesson)
		throw errors.LessonAttemptNotFound({ lessonOrderNumber });
	return lesson;
};

UnitAttempt.methods.allLessonsArePassed = function() {
	return this.lessonsAttempts.every(lessonAttempt => lessonAttempt.isPassed());
};

UnitAttempt.methods.attemptLesson = function({ lessonOrderNumber }) {
	if(!this.isInProgress())
		throw errors.UnitAttemptNotInProgress();
	return this.getLessonAttempt(lessonOrderNumber).attempt();
};

UnitAttempt.methods.attemptLessonExercise = function({ lessonOrderNumber, exerciseOrderNumber, answer }) {
	if(!this.isInProgress())
		throw errors.UnitAttemptNotInProgress();
	return this.getLessonAttempt(lessonOrderNumber).attemptExercise({ exerciseOrderNumber, answer });
};

// Exams
UnitAttempt.methods.attemptExam = function() {
	if(!this.isInProgress())
		throw errors.UnitAttemptNotInProgress();
	if(!this.allLessonsArePassed())
		throw errors.ExamAttemptWithUnfinishedLessons();
	this.examAttempt.attempt();
};

UnitAttempt.methods.attemptExamExercise = function({ exerciseOrderNumber, answer }) {
	if(!this.isInProgress())
		throw errors.UnitAttemptNotInProgress();
	if(!this.allLessonsArePassed())
		throw errors.ExamAttemptWithUnfinishedLessons();
	this.examAttempt.attemptExercise({ exerciseOrderNumber, answer });
};

/*
 * Exports
 */
module.exports = {
	schema: UnitAttempt,
	model: mongoose.model('UnitAttempt', UnitAttempt)
};
