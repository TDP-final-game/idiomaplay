const mongoose = require('mongoose');

const ChallengeInfo = require('./challengeInfo');
const {schema: Unit} = require('../units/unit');
const {model: ChallengeAttempt} = require('../attempts/challengeAttempt');

const Challenge = new mongoose.Schema({
  challengeInfo: {
    type: ChallengeInfo,
    required: [true, 'ChallengeInfo is required']
  },
  units: [{type: Unit, required: false}]
});


Challenge.methods.newAttempt = function () {
  return new ChallengeAttempt({
    challengeInfo: this.challengeInfo,
    challengeId: this._id,
    unitsAttempts: this.units.map(unit => ({ unitInfo: unit.unitInfo }))
  });
}

module.exports = {
  schema: Challenge,
  model: mongoose.model('Challenge', Challenge)
};
