const mongoose = require('mongoose');
const EXERCISE_TYPES = require('../../utils/exercise_types');

const Exercise = new mongoose.Schema({
	_id: false,
	type: {
		type: String,
        enum : Object.keys(EXERCISE_TYPES),
		required: [true, 'type is required']
	},
	data: {
		type: Object,
		required: [true, 'data is required']
	}
});

module.exports = Exercise;