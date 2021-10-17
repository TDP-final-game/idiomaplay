'use strict';

const exerciseTypes = require('../../../../constants/exerciseTypes');

module.exports = {
	type: exerciseTypes.COMPLETE_SENTENCE,
	statement: 'There was a __________________ when people do not shower',
	options: [
		{
			text: 'Cute',
			correct: false
		},
		{
			text: 'Time',
			correct: true
		},
		{
			text: 'Dirty',
			correct: false
		},
		{
			text: 'Place',
			correct: false
		}
	]
};
