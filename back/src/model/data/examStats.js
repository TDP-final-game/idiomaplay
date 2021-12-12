'use strict';

const mongoose = require('mongoose');

/*
 * Schema
 */
const ExamStats = new mongoose.Schema({
	date: { type: Date, required: true },
	numberOfExams: { type: Number, required: true },
	totalDuration: { type: Number, required: true }
});


module.exports = {
	schema: ExamStats,
	model: mongoose.model('ExamStats', ExamStats)
};
