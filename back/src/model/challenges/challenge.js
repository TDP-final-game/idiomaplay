const mongoose = require('mongoose');

const ChallengeInfo = require('./challengeInfo');
const {schema: Unit} = require('../units/unit');
const {model: ChallengeAttempt} = require('../attempts/challengeAttempt');
const errors = require('./errors');

/*
 * Schema
 */
const Challenge = new mongoose.Schema({
  challengeInfo: {
    type: ChallengeInfo,
    required: [true, 'ChallengeInfo is required']
  },
  units: [{type: Unit, required: false}]
});


/*
 * Instance methods
 */
Challenge.methods.newAttempt = function () {
  return new ChallengeAttempt({
    challengeInfo: this.challengeInfo,
    challenge: this._id,
    unitsAttempts: this.units.map(unit => unit.newAttempt())
  });
}

Challenge.methods.getUnit = function (unitOrderNumber) {
  const unit = this.units.find(unit => unit.unitInfo.orderNumber === unitOrderNumber);
  if (!unit) throw errors.UnitNotFound({unitOrderNumber})
  return unit
}

/*
 * Exports
 */
module.exports = {
  schema: Challenge,
  model: mongoose.model('Challenge', Challenge)
};
