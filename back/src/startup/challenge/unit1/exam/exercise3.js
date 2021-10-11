'use strict';

const exerciseTypes = require('../../../../constants/exerciseTypes');

module.exports = {
	type: exerciseTypes.TRANSLATE_TO_NATIVE,
	statement: 'Today is a great day to save lives',
	options: [
		{
			text: 'Hoy es un buen día para salvar vidas',
			correct: true
		},
		{
			text: 'Soy bueno salvando vidas',
			correct: false
		},
		{
			text: 'Muchos dias no salvamos vidas',
			correct: false
		},
		{
			text: 'Muchos dias salvamos vidas',
			correct: false
		},
		{
			text: 'Las vidas no son siempre salvables',
			correct: false
		},
		{
			text: 'Ayer fue un gran dia para salvar vidas',
			correct: false
		}
	]
};
