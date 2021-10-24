'use strict';

const { model: ExerciseAttempt } = require('../../../src/model/attempts/exerciseAttempt');
const exerciseTypes = require('../../../src/constants/exerciseTypes');

class ExerciseAttemptExample {

	static new() {
		return new ExerciseAttemptExample();
	}

	constructor() {
		this.type = exerciseTypes.COMPLETE_SENTENCE;
		this.statement = 'There was a __________________ when people do not shower';
		this.options = [
			{
				text: 'Cute',
				correct: false
			},
			{
				text: 'Time',
				correct: true
			},
			{
				text: 'Dirty',
				correct: false
			},
			{
				text: 'Place',
				correct: false
			}
		];
	}

	build() {
		return new ExerciseAttempt({
			type: this.type,
			statement: this.statement,
			options: this.options
		});
	}
}

module.exports = ExerciseAttemptExample;
