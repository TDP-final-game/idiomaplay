const mongoose = require('mongoose');

const ExamInfo = require('./examInfo');
const {schema: Exercise} = require('../exercises/exercise');
const {model: ExamAttempt} = require('../attempts/examAttempt');
const STATUSES = require('../../constants/statuses.json');

/*
 * Schema
 */
const Exam = new mongoose.Schema({
	_id: false,
	examInfo: {
		type: ExamInfo,
		required: [true, 'ExamInfo is required']
	},
	exercises: [{type: Exercise, required: false}],
});

/*
 * Instance methods
 */
Exam.methods.newAttempt = function () {
	return new ExamAttempt({
		examInfo: this.examInfo,
		status: STATUSES.PENDING
	})
}

/*
 * Exports
 */
module.exports = {
	schema: Exam
};


