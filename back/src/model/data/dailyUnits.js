'use strict';

const mongoose = require('mongoose');

/*
 * Schema
 */
const DailyUnits = new mongoose.Schema({
	challenge: { type: mongoose.Types.ObjectId, required: true },
	unitOrderNumber: { type: Number, required: true },
	date: { type: Date, required: true }
});


module.exports = {
	schema: DailyUnits,
	model: mongoose.model('DailyUnits', DailyUnits)
};
