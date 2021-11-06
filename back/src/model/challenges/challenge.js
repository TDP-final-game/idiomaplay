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
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });


/*
 * Instance methods
 */
Challenge.methods.newAttempt = function() {
	const attempt = new ChallengeAttempt({
		...this.toObject(),
		challenge: this,
		unitsAttempts: this.units.map(unit => unit.newAttempt())
	});
	attempt.id = undefined;
	attempt._id = undefined;
	return attempt;
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
