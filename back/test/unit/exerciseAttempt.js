'use strict';

const chai = require('chai');

const { expect } = chai;
const ExerciseAttemptExample = require('./examples/exerciseAttempt');
const Status = require('../../src/model/attempts/status');

describe('exerciseAttempt', () => {
	it('should be pending on creation', () => {
		const exercise = ExerciseAttemptExample.new().build();
		expect(exercise.status).to.eql(Status.PENDING());
	});

	it('should be passed when correctly answered', () => {
		const exercise = ExerciseAttemptExample.new().build();
		const correctOption = exercise.correctOption();
		exercise.attempt({ answer: correctOption.text });
		expect(exercise.status).to.eql(Status.PASSED());
	});

	it('should be failed when incorrectly answered', () => {
		const exercise = ExerciseAttemptExample.new().build();
		exercise.attempt({ answer: exercise.options[0].text });
		expect(exercise.status).to.eql(Status.FAILED());
	});
});
