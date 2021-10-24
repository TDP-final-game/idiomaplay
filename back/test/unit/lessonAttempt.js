'use strict';

const chai = require('chai');

const { expect } = chai;
const LessonAttemptExample = require('./examples/lessonAttempt');
const Status = require('../../src/model/attempts/status');

const passLessons = (lesson, start, finish) => {
	lesson.exercisesAttempts.slice(start, finish).forEach(exercise => exercise.attempt({ answer: exercise.correctOption().text }));
};

const failLessons = (lesson, start, finish) => {
	lesson.exercisesAttempts.slice(start, finish).forEach(exercise => exercise.attempt({ answer: exercise.options[0].text }));
};

describe('lessonAttempt', () => {
	it('should be pending when started', () => {
		const lesson = LessonAttemptExample.new().build();
		expect(lesson.status).to.eql(Status.PENDING());
	});

	it('should be in progress when attempted', () => {
		const lesson = LessonAttemptExample.new().build();
		lesson.attempt();
		expect(lesson.status).to.eql(Status.IN_PROGRESS());
	});

	it('should be in progress when not all exercises are answered', () => {
		const lesson = LessonAttemptExample.new().build();
		lesson.attempt();

		passLessons(lesson, 0, 7);

		expect(lesson.status).to.eql(Status.IN_PROGRESS());
	});

	it('should be passed when all exercises are correctly answered', () => {
		const lesson = LessonAttemptExample.new().build();
		lesson.attempt();

		passLessons(lesson);

		expect(lesson.status).to.eql(Status.PASSED());
	});

	it('should be passed when all except one exercise are correctly answered', () => {
		const lesson = LessonAttemptExample.new().build();
		lesson.attempt();

		failLessons(lesson, 0, 1);
		passLessons(lesson, 1);

		expect(lesson.status).to.eql(Status.PASSED());
	});

	it('should be failed when two exercises are incorrectly answered', () => {
		const lesson = LessonAttemptExample.new().build();
		lesson.attempt();

		failLessons(lesson, 0, 2);
		passLessons(lesson, 2);

		expect(lesson.status).to.eql(Status.FAILED());
	});

	it('should be failed when all exercises are incorrectly answered', () => {
		const lesson = LessonAttemptExample.new().build();
		lesson.attempt();
		failLessons(lesson);
		expect(lesson.status).to.eql(Status.FAILED());
	});
});
