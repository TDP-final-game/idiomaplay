const mongoose = require('mongoose');
const Lesson = require('./lesson');
const Exam = require('./exam');

const Unit = new mongoose.Schema({
	_id: false,
	orderNumber: {
		type: Number,
		required: [true, 'orderNumber is required']
	},
	name: {
		type: String,
		required: [true, 'name is required']
	},
	description: {
		type: String,
		required: [true, 'description is required']
	},
	exam: {type: Exam, required: false},
    lessons: [{type: Lesson, required: false}]
});

module.exports = Unit;