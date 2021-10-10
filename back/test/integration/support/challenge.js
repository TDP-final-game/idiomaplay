const createChallenge = require('../../../src/startup/createChallenge')

function Challenge(app) {
  this.app = app;
}

Challenge.prototype.create = async function() {
  return (await createChallenge()).toObject();
};

module.exports = Challenge;
