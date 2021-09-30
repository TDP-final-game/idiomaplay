const mongoose = require('mongoose');
const Exercise = require('./exercise');

const Lesson = new mongoose.Schema({
	_id: false,
	name: {
		type: String,
		required: [true, 'name is required']
	},
	description: {
		type: String,
		required: [true, 'difficulty is required']
	},
    orderNumber: {
		type: Number,
		required: [true, 'orderNumber is required']
	},
	exercises: [{type: Exercise, required: false}],
});

module.exports = Lesson;