'use strict';

class ChallengeAttempt {

	constructor(app) {
		this.app = app;
	}

	create({ challengeId }) {
		return this.app
			.post('/challengeAttempts')
			.send({ challengeId });
	}

	attemptUnit({ challengeAttemptId, unitOrderNumber }) {
		return this.app
			.put(`/challengeAttempts/${challengeAttemptId}/unitsAttempts`)
			.send({ unitOrderNumber });
	}

	attemptLesson({ challengeAttemptId, unitOrderNumber, lessonOrderNumber }) {
		return this.app
			.put(`/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}/lessonsAttempts`)
			.send({ lessonOrderNumber });
	}

	attemptLessonExercise({
		challengeAttemptId, unitOrderNumber, lessonOrderNumber, exerciseOrderNumber, answer
	}) {
		return this.app
			.put(`/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}/lessonsAttempts/${lessonOrderNumber}/exercisesAttempts`)
			.send({ exerciseOrderNumber, answer });
	}

	attemptExam({ challengeAttemptId, unitOrderNumber }) {
		return this.app
			.put(`/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}/examAttempt`)
			.send({});
	}

	attemptExamExercise({ challengeAttemptId, unitOrderNumber, exerciseOrderNumber, answer }) {
		return this.app
			.put(`/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}/examAttempt/exercisesAttempts`)
			.send({ exerciseOrderNumber, answer });
	}

	getChallengeAttempt({ challengeAttemptId }) {
		return this.app
			.get(`/challengeAttempts/${challengeAttemptId}`);
	}

	getUnitAttempt({ challengeAttemptId, unitOrderNumber }) {
		return this.app
			.get(`/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}`);
	}

	getLessonAttempt({ challengeAttemptId, unitOrderNumber, lessonOrderNumber }) {
		return this.app
			.get(`/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}/lessonsAttempts/${lessonOrderNumber}`);
	}
}

module.exports = ChallengeAttempt;
