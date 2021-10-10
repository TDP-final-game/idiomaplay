const createChallenge = require('../../../src/startup/createChallenge')

function Challenge(app) {
  this.app = app;
}

Challenge.prototype.create = async function() {
  return JSON.parse(JSON.stringify(await createChallenge()));
};

Challenge.prototype.get = async function({challengeId}) {
  return this.app.get(`/challenges/${challengeId}`);
};

Challenge.prototype.list = async function() {
  return this.app.get(`/challenges`);
};

module.exports = Challenge;
