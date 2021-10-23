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

	attemptUnit({ challengeId, unitOrderNumber }) {
		return this.app
			.put(`/challengeAttempts/${challengeId}/unitsAttempts`)
			.send({ unitOrderNumber });
	}

	attemptLesson({ challengeId, unitOrderNumber, lessonOrderNumber }) {
		return this.app
			.put(`/challengeAttempts/${challengeId}/unitsAttempts/${unitOrderNumber}/lessonsAttempts`)
			.send({ lessonOrderNumber });
	}

	attemptLessonExercise({
		challengeId, unitOrderNumber, lessonOrderNumber, exerciseOrderNumber, answer
	}) {
		return this.app
			.put(`/challengeAttempts/${challengeId}/unitsAttempts/${unitOrderNumber}/lessonsAttempts/${lessonOrderNumber}/exercisesAttempts`)
			.send({ exerciseOrderNumber, answer });
	}

	attemptExam({ challengeId, unitOrderNumber }) {
		return this.app
			.put(`/challengeAttempts/${challengeId}/unitsAttempts/${unitOrderNumber}/examAttempt`)
			.send({});
	}

	attemptExamExercise({ challengeId, unitOrderNumber, exerciseOrderNumber, answer }) {
		return this.app
			.put(`/challengeAttempts/${challengeId}/unitsAttempts/${unitOrderNumber}/examAttempt/exercisesAttempts`)
			.send({ exerciseOrderNumber, answer });
	}

	getChallengeAttempt({ challengeId }) {
		return this.app
			.get(`/challengeAttempts/${challengeId}`);
	}

	getUnitAttempt({ challengeId, unitOrderNumber }) {
		return this.app
			.get(`/challengeAttempts/${challengeId}/unitsAttempts/${unitOrderNumber}`);
	}

	getLessonAttempt({ challengeId, unitOrderNumber, lessonOrderNumber }) {
		return this.app
			.get(`/challengeAttempts/${challengeId}/unitsAttempts/${unitOrderNumber}/lessonsAttempts/${lessonOrderNumber}`);
	}
}

module.exports = ChallengeAttempt;
