'use strict';

module.exports = {
	day: {
		type: String,
		required: [true, 'name is required']
	},
	quantity: {
		type: String,
		required: [true, 'difficulty is required']
	},
	totalDuration: {
		type: String,
		required: [true, 'description is required']
	}
};
