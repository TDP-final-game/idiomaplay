'use strict';

const mongoose = require('mongoose');

const examInfo = require('../exams/examInfo');
const { schema: ExerciseAttempt } = require('./exerciseAttempt');
const errors = require('./errors');
const Status = require('./status');
const randomGenerator = require("../randomGenerator");

/*
 * Schema
 */
const ExamAttempt = new mongoose.Schema({
	_id: false,
	...examInfo,
	firstAttempt: {
		type: Boolean,
		required: true,
		default: true
	},
	expirationDate: {
		type: Number,
		required: false
	},
	exercisesAttempts: [{ type: ExerciseAttempt, required: false }]
}, { autoCreate: false, toObject: { virtuals: true }, toJSON: { virtuals: true } });

/*
 * Instance methods
 */
ExamAttempt.virtual('status').get(function() {
	if(!this.exercisesAttempts || this.exercisesAttempts.length === 0)
		return Status.PENDING();
	if(this.isExamPassed())
		return Status.PASSED();
	if(this.exercisesAttempts.every(exercise => exercise.isCompleted()))
		return Status.FAILED();
	return Status.IN_PROGRESS();
});

Status.AddMethodsToSchema(ExamAttempt);

ExamAttempt.methods.unitAttempt = function() {
	return this.parent();
};

ExamAttempt.methods.attempt = function() {
	const { challenge } = this.ownerDocument();
	const { exam } = challenge.getUnit(this.unitAttempt().orderNumber);

	const shuffledExercises = exam.exercises.sort(() => 0.5 - randomGenerator.new());
	const selected = shuffledExercises.slice(0, 16);

	this.firstAttempt = !this.isCompleted();
	this.expirationDate = Date.now() + 15 * 60 * 1000;
	this.exercisesAttempts = selected.map(exercise => exercise.newAttempt());
};

ExamAttempt.methods.getExercise = function(exerciseOrderNumber) {
	const exercise = this.exercisesAttempts[exerciseOrderNumber];
	if(!exercise)
		throw errors.ExerciseAttemptNotFound({ exerciseOrderNumber });
	return exercise;
};

ExamAttempt.methods.attemptExercise = function({ exerciseOrderNumber, answer }) {
	const exercise = this.getExercise(exerciseOrderNumber);
	exercise.attempt({ answer });
};

ExamAttempt.methods.numberOfPassedExercises = function() {
	return this.exercisesAttempts.filter(exercise => exercise.isPassed()).length;
};

ExamAttempt.methods.isExamPassed = function() {
	return this.exercisesAttempts.every(exercise => exercise.isCompleted())
		&& this.numberOfPassedExercises() / this.exercisesAttempts.length >= 0.8;
};

/*
 * Exports
 */
module.exports = {
	schema: ExamAttempt,
	model: mongoose.model('ExamAttempt', ExamAttempt)
};
