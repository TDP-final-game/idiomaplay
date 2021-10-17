'use strict';

const exerciseTypes = require('../../../../constants/exerciseTypes');

module.exports = {
	type: exerciseTypes.TRANSLATE_TO_FOREIGN,
	statement: 'Hoy es un buen día para salvar vidas',
	options: [
		{
			text: 'Today It\'s a great day to save lives',
			correct: true
		},
		{
			text: 'Tomorrow is a great day to save lifes',
			correct: false
		},
		{
			text: 'Next year I will move to Lisboa',
			correct: false
		},
		{
			text: 'I care about people lives',
			correct: false
		},
		{
			text: 'Hyde, how you doing?',
			correct: false
		},
		{
			text: 'Bye, hope you have a nice day',
			correct: false
		}
	]
};
