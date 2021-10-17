'use strict';

const mongoose = require('mongoose');

const lessonInfo = require('../lessons/lessonInfo');
const { schema: ExerciseAttempt } = require('./exerciseAttempt');
const errors = require('./errors');
const Status = require('./status');

/*
 * Schema
 */
const LessonAttempt = new mongoose.Schema({
	_id: false,
	...lessonInfo,
	exercisesAttempts: [{ type: ExerciseAttempt, required: false }]
}, { autoCreate: false, toObject: { virtuals: true }, toJSON: { virtuals: true } });

/*
 * Instance methods
 */
LessonAttempt.virtual('status').get(function() {
	if(!this.exercisesAttempts || this.exercisesAttempts.length === 0)
		return Status.PENDING();
	if(this.exercisesAttempts.every(exercise => exercise.isPassed()))
		return Status.PASSED();
	if(this.exercisesAttempts.every(exercise => exercise.isCompleted()))
		return Status.FAILED();
	return Status.IN_PROGRESS();
});

Status.AddMethodsToSchema(LessonAttempt);

LessonAttempt.methods.unitAttempt = function() {
	return this.parent();
};

LessonAttempt.methods.attempt = function() {
	const { challenge } = this.ownerDocument();
	const unit = challenge.getUnit(this.unitAttempt().orderNumber);
	const lesson = unit.getLesson(this.orderNumber);

	this.exercisesAttempts = lesson.exercises.map(exercise => exercise.newAttempt());
};

LessonAttempt.methods.getExercise = function(exerciseOrderNumber) {
	const exercise = this.exercisesAttempts[exerciseOrderNumber];
	if(!exercise)
		throw errors.ExerciseAttemptNotFound({ exerciseOrderNumber });
	return exercise;
};

LessonAttempt.methods.attemptExercise = function({ exerciseOrderNumber, answer }) {
	const exercise = this.getExercise(exerciseOrderNumber);
	exercise.attempt({ answer });
};

/*
 * Exports
 */
module.exports = {
	schema: LessonAttempt,
	model: mongoose.model('LessonAttempt', LessonAttempt)
};
