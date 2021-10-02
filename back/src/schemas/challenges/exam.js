const mongoose = require('mongoose');
const Exercise = require('./exercise');

const Exam = new mongoose.Schema({
	_id: false,
	name: {
		type: String,
		required: [true, 'name is required']
	},
	description: {
		type: String,
		required: [true, 'difficulty is required']
	},
    durationInMinutes: {
		type: Number,
		required: [true, 'durationInMinutes is required']
	},
	exercises: [{type: Exercise, required: false}],
});

module.exports = Exam;


