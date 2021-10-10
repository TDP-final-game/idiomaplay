function ChallengeAttempt(app) {
  this.app = app;
}

ChallengeAttempt.prototype.create = function({challengeId}) {
  return this.app
    .post('/challengeAttempts')
    .send({challengeId})
};

ChallengeAttempt.prototype.attemptUnit = function({challengeId, unitOrderNumber}) {
  return this.app
    .put(`/challengeAttempts/${challengeId}/unitsAttempts`)
    .send({unitOrderNumber})
};

ChallengeAttempt.prototype.attemptLesson = function({challengeId, unitOrderNumber, lessonOrderNumber}) {
  return this.app
    .put(`/challengeAttempts/${challengeId}/unitsAttempts/${unitOrderNumber}/lessonsAttempts`)
    .send({lessonOrderNumber})
};

ChallengeAttempt.prototype.attemptLessonExercise = function({challengeId, unitOrderNumber, lessonOrderNumber, exerciseOrderNumber, answer}) {
  return this.app
    .put(`/challengeAttempts/${challengeId}/unitsAttempts/${unitOrderNumber}/lessonsAttempts/${lessonOrderNumber}/exercisesAttempts`)
    .send({exerciseOrderNumber, answer})
};

ChallengeAttempt.prototype.attemptExam = function({challengeId, unitOrderNumber}) {
  return this.app
    .put(`/challengeAttempts/${challengeId}/unitsAttempts/${unitOrderNumber}/examAttempt`)
    .send({})
};

ChallengeAttempt.prototype.attemptExamExercise = function({challengeId, unitOrderNumber, exerciseOrderNumber, answer}) {
  return this.app
    .put(`/challengeAttempts/${challengeId}/unitsAttempts/${unitOrderNumber}/examAttempt/exercisesAttempts`)
    .send({exerciseOrderNumber, answer})
};

module.exports = ChallengeAttempt;
