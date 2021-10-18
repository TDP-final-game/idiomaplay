'use strict';

const mongoose = require('mongoose');

const challengeInfo = require('./challengeInfo');
const { schema: Unit } = require('../units/unit');
const { model: ChallengeAttempt } = require('../attempts/challengeAttempt');
const errors = require('./errors');

/*
 * Schema
 */
const Challenge = new mongoose.Schema({
	...challengeInfo,
	units: [{ type: Unit, required: false }]
});


/*
 * Instance methods
 */
Challenge.methods.newAttempt = function() {
	return new ChallengeAttempt({
		...this.toObject(),
		challenge: this,
		unitsAttempts: this.units.map(unit => unit.newAttempt())
	});
};

Challenge.methods.getUnit = function(unitOrderNumber) {
	const unit = this.units.find(someUnit => someUnit.orderNumber === unitOrderNumber);
	if(!unit)
		throw errors.UnitNotFound({ unitOrderNumber });
	return unit;
};

/*
 * Exports
 */
module.exports = {
	schema: Challenge,
	model: mongoose.model('Challenge', Challenge)
};
