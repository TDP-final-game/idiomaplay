'use strict';

const mongoose = require('mongoose');

/*
 * Schema
 */
const DailyAccess = new mongoose.Schema({
	userId: { type: mongoose.Types.ObjectId, required: true },
	date: { type: Date, required: true }
});


module.exports = {
	schema: DailyAccess,
	model: mongoose.model('DailyAccess', DailyAccess)
};
