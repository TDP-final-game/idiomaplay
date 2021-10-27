'use strict';

const mongoose = require('mongoose');

const exerciseInfo = require('./exerciseInfo');
const STATUSES = require('../../constants/statuses.json');
const { model: ExerciseAttempt } = require('../attempts/exerciseAttempt');

/*
 * Schema
 */
const Exercise = new mongoose.Schema(exerciseInfo);

/*
 * Instance methods
 */
Exercise.methods.newAttempt = function() {
	// todo: when adding a new exercise to lesson or exam check that there is one and only one correct answer and at least one incorrect answer
	const incorrectAnswersShuffled = this.options.filter(option => option.correct === false).sort(() => 0.5 - Math.random());
	const selected = incorrectAnswersShuffled.slice(0, 3);
	const correctAnswer = this.options.filter(option => option.correct === true);
	const options = selected.concat(correctAnswer).sort(() => 0.5 - Math.random());

	return new ExerciseAttempt({
		type: this.type,
		statement: this.statement,
		options,
		status: STATUSES.PENDING
	});
};

/*
 * Exports
 */
module.exports = {
	schema: Exercise
};
