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

module.exports = ChallengeAttempt;
