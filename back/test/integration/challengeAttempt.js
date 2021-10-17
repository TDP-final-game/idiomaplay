'use strict';

const chai = require('chai');

const { expect } = chai;
const ChallengeExample = require('./support/challenge');
const ChallengeAttemptExample = require('./support/challengeAttempt');
const STATUSES = require('../../src/constants/statuses.json');

const compare = ({ properties, obj1, obj2 }) => {
	properties.forEach(property => {
		expect(obj1[property]).to.eql(obj2[property]);
	});
};

const correctAnswer = exercise => exercise.options.find(option => option.correct).text;

describe('/challengeAttempts', () => {
	let challenge;
	let challengeAttemptReq;
	let unitAttemptReq;
	let lessonAttemptReq;
	const lessonExercisesAttemptReq = [];
	let examAttemptReq;
	const examExercisesAttemptReq = [];

	beforeEach(async function() {
		const challengeExample = new ChallengeExample(this.app);
		const challengeAttemptExample = new ChallengeAttemptExample(this.app);

		// Challenge
		challenge = await challengeExample.create();
		challengeAttemptReq = await challengeAttemptExample.create({ challengeId: challenge._id });
		const challengeId = challenge._id;
		const unitOrderNumber = challenge.units[0].orderNumber;
		const lessonOrderNumber = challenge.units[0].lessons[0].orderNumber;

		// Unit
		unitAttemptReq = await challengeAttemptExample.attemptUnit({
			challengeId,
			unitOrderNumber
		});

		// Lesson
		lessonAttemptReq = await challengeAttemptExample.attemptLesson({
			challengeId,
			unitOrderNumber,
			lessonOrderNumber
		});

		const { exercises } = challenge.units[0].lessons[0];
		for(const exercise of exercises) {
			lessonExercisesAttemptReq.push(
				await challengeAttemptExample.attemptLessonExercise({
					challengeId,
					unitOrderNumber,
					lessonOrderNumber,
					exerciseOrderNumber: exercises.indexOf(exercise),
					answer: correctAnswer(exercise)
				})
			);
		}

		// Exam
		examAttemptReq = await challengeAttemptExample.attemptExam({
			challengeId,
			unitOrderNumber
		});

		const examExercises = challenge.units[0].exam.exercises;
		for(const exercise of examExercises) {
			examExercisesAttemptReq.push(
				await challengeAttemptExample.attemptExamExercise({
					challengeId,
					unitOrderNumber,
					exerciseOrderNumber: examExercises.indexOf(exercise),
					answer: correctAnswer(exercise)
				})
			);
		}
	});

	describe('POST /', () => {
		it('should create a challenge attempt', async () => {
			expect(challengeAttemptReq).to.have.status(200);

			const challengeAttempt = challengeAttemptReq.body;
			compare({
				properties: ['name', 'difficulty', 'description'],
				obj1: challengeAttempt,
				obj2: challenge
			});
			expect(challengeAttempt.status.status).to.eql(STATUSES.IN_PROGRESS);

			const unit = challenge.units[0];
			const unitAttempt = challengeAttempt.unitsAttempts[0];
			compare({
				properties: ['name', 'orderNumber', 'description'],
				obj1: unitAttempt,
				obj2: unit
			});
			expect(unitAttempt.status.status).to.eql(STATUSES.PENDING);
			expect(unitAttempt.lessonsAttempts).to.eql([]);
		});
	});

	describe('PUT /:challengeAttemptId/unitsAttempts', () => {
		it('should change the unit attempt to "in progress"', async () => {
			expect(unitAttemptReq).to.have.status(200);

			const unitAttempt = unitAttemptReq.body;
			const unit = challenge.units[0];
			compare({
				properties: ['name', 'orderNumber', 'description'],
				obj1: unitAttempt,
				obj2: unit
			});
			expect(unitAttempt.status.status).to.eql(STATUSES.IN_PROGRESS);

			const lessonAttempt = unitAttempt.lessonsAttempts[0];
			const lesson = unit.lessons[0];
			compare({
				properties: ['name', 'orderNumber', 'description'],
				obj1: lessonAttempt,
				obj2: lesson
			});
			expect(lessonAttempt.status.status).to.eql(STATUSES.PENDING);
			expect(lessonAttempt.exercisesAttempts).to.eql([]);

			const { examAttempt } = unitAttempt;
			const { exam } = unit;
			compare({
				properties: ['name', 'orderNumber', 'description', 'durationInMinutes'],
				obj1: examAttempt,
				obj2: exam
			});
			expect(examAttempt.status.status).to.eql(STATUSES.PENDING);
		});
	});

	describe('PUT /:challengeAttemptId/unitsAttempts/:unitOrderNumber/lessonsAttempts', () => {
		it('should change the lesson attempt to "in progress"', async () => {
			expect(lessonAttemptReq).to.have.status(200);

			const lessonAttempt = lessonAttemptReq.body;
			const lesson = challenge.units[0].lessons[0];
			compare({
				properties: ['name', 'orderNumber', 'description'],
				obj1: lessonAttempt,
				obj2: lesson
			});
			expect(lessonAttempt.status.status).to.eql(STATUSES.IN_PROGRESS);

			const exerciseAttempt = lessonAttempt.exercisesAttempts[0];
			const exercise = lesson.exercises[0];
			compare({
				properties: ['type', 'statement', 'options'],
				obj1: exerciseAttempt,
				obj2: exercise
			});
			expect(exerciseAttempt.status.status).to.eql(STATUSES.PENDING);
		});
	});

	describe('PUT /:challengeAttemptId/unitsAttempts/:unitOrderNumber/lessonsAttempts/:lessonOrderNumber/exercisesAttempts', () => {
		it('should change the lesson exercise attempt to "passed"', async () => {
			const lessonExerciseAttemptReq = lessonExercisesAttemptReq[0];
			expect(lessonExerciseAttemptReq).to.have.status(200);

			const exerciseAttempt = lessonExerciseAttemptReq.body;
			const exercise = challenge.units[0].lessons[0].exercises[0];
			compare({
				properties: ['type', 'statement', 'options'],
				obj1: exerciseAttempt,
				obj2: exercise
			});
			expect(exerciseAttempt.status.status).to.eql(STATUSES.PASSED);
			expect(exerciseAttempt.optionAnswered).to.eql(correctAnswer(exercise));
		});
	});

	describe('PUT /:challengeAttemptId/unitsAttempts/:unitOrderNumber/examAttempt', () => {
		it('should change the exam attempt to "in progress"', async () => {
			expect(examAttemptReq).to.have.status(200);

			const examAttempt = examAttemptReq.body;
			const { exam } = challenge.units[0];
			compare({
				properties: ['name', 'description', 'durationInMinutes'],
				obj1: examAttempt,
				obj2: exam
			});
			expect(examAttempt.status.status).to.eql(STATUSES.IN_PROGRESS);

			const exerciseAttempt = examAttempt.exercisesAttempts[0];
			const exercise = exam.exercises[0];
			compare({
				properties: ['type', 'statement', 'options'],
				obj1: exerciseAttempt,
				obj2: exercise
			});
			expect(exerciseAttempt.status.status).to.eql(STATUSES.PENDING);
		});
	});

	describe('PUT /:challengeAttemptId/unitsAttempts/:unitOrderNumber/examAttempt/exercisesAttempts', () => {
		it('should change the exam exercise attempt to "passed"', async () => {
			const examExerciseAttemptReq = examExercisesAttemptReq[0];
			expect(examExerciseAttemptReq).to.have.status(200);

			const exerciseAttempt = examExerciseAttemptReq.body;
			const exercise = challenge.units[0].exam.exercises[0];
			compare({
				properties: ['type', 'statement', 'options'],
				obj1: exerciseAttempt,
				obj2: exercise
			});
			expect(exerciseAttempt.status.status).to.eql(STATUSES.PASSED);
			expect(exerciseAttempt.optionAnswered).to.eql(correctAnswer(exercise));
		});
	});
});
