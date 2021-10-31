'use strict';

const mongoose = require('mongoose');

const exerciseInfo = require('./exerciseInfo');
const STATUSES = require('../../constants/statuses.json');
const { model: ExerciseAttempt } = require('../attempts/exerciseAttempt');
const exerciseTypes = require('../../constants/exerciseTypes');

/*
 * Schema
 */
const Exercise = new mongoose.Schema(exerciseInfo);

/*
 * Instance methods
 */
Exercise.methods.newAttempt = function() {
	const incorrectAnswersShuffled = this.options.filter(option => option.correct === false).sort(() => 0.5 - Math.random());

	let wrongOptionsAmount;
	if(this.type === exerciseTypes.COMPLETE_SENTENCE)
		wrongOptionsAmount = 3;
	else
		wrongOptionsAmount = 5;


	const selected = incorrectAnswersShuffled.slice(0, wrongOptionsAmount);
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
