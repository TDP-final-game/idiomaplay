const mongoose = require('mongoose');
const Exercise = require('../exercises/exercise');
const ExamInfo = require('./examInfo');

const Exam = new mongoose.Schema({
	_id: false,
	examInfo: {
		type: ExamInfo,
		required: [true, 'ExamInfo is required']
	},
	exercises: [{type: Exercise, required: false}],
});

module.exports = Exam;


