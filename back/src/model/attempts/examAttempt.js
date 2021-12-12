'use strict';

const mongoose = require('mongoose');

const examInfo = require('../exams/examInfo');
const { schema: ExerciseAttempt } = require('./exerciseAttempt');
const errors = require('./errors');
const Status = require('./status');
const Reward = require('./reward');
const randomGenerator = require('../randomGenerator');

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
	startingDate: {
		type: Number,
		required: false
	},
	aborted: {
		type: Boolean,
		default: false
	},
	exercisesAttempts: [{ type: ExerciseAttempt, required: false }]
}, { autoCreate: false, toObject: { virtuals: true }, toJSON: { virtuals: true } });

/*
 * Instance methods
 */

ExamAttempt.virtual('status').get(function() {
	if(this.aborted)
		return Status.FAILED();
	if(!this.exercisesAttempts || this.exercisesAttempts.length === 0)
		return Status.PENDING();
	if(this.isExamPassed())
		return Status.PASSED();
	if(this.exercisesAttempts.every(exercise => exercise.isCompleted()) || Date.now() > this.expirationDate)
		return Status.FAILED();
	return Status.IN_PROGRESS();
});

ExamAttempt.virtual('reward').get(function() {
	if(this.isExamPassed()) {
		if(this.firstAttempt)
			return new Reward({ coins: 30, lives: 1 });
		return new Reward({ coins: 15, lives: 0 });
	}
	if(this.exercisesAttempts.every(exercise => exercise.isCompleted()) || Date.now() > this.expirationDate || this.aborted)
		return new Reward({ coins: 0, lives: -1 });
	return new Reward({ coins: 0, lives: 0 });
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
	this.aborted = false;

	const now = Date.now();
	this.startingDate = now;
	this.expirationDate = now + 15 * 60 * 1000;
	this.exercisesAttempts = selected.map(exercise => exercise.newAttempt());
};

ExamAttempt.methods.getExercise = function(exerciseOrderNumber) {
	const exercise = this.exercisesAttempts[exerciseOrderNumber];
	if(!exercise)
		throw errors.ExerciseAttemptNotFound({ exerciseOrderNumber });
	return exercise;
};

ExamAttempt.methods.abort = function() {
	this.aborted = true;
	const { user } = this.ownerDocument();
	user.addReward(this.reward);
};

ExamAttempt.methods.attemptExercise = async function({ exerciseOrderNumber, answer }) {
	const exercise = this.getExercise(exerciseOrderNumber);

	if(Date.now() > this.expirationDate)
		throw errors.ExamExpired(this.expirationDate);
	exercise.attempt({ answer });

	if(this.isExamPassed()) {
		const { user } = this.ownerDocument();
		user.addReward(this.reward);
		return;
	}

	if(this.exercisesAttempts.every(examExercise => examExercise.isCompleted()) || Date.now() > this.expirationDate) {
		const { user } = this.ownerDocument();
		user.addReward(this.reward);
	}
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
