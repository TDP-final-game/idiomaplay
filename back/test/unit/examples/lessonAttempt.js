'use strict';

const ChallengeExample = require('./challenge');

class LessonAttemptExample {
	static new() {
		return new LessonAttemptExample();
	}

	build() {
		const challenge = ChallengeExample.new().build();
		const unitOrderNumber = challenge.units[0].orderNumber;
		const lessonOrderNumber = challenge.units[0].lessons[0].orderNumber;

		const challengeAttempt = challenge.newAttempt();
		challengeAttempt.attemptUnit({ unitOrderNumber });
		return challengeAttempt.getUnitAttempt(unitOrderNumber).getLessonAttempt(lessonOrderNumber);
	}
}

module.exports = LessonAttemptExample;
