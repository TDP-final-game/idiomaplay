'use strict';

const exercise1 = require('./exercise1');
const exercise2 = require('./exercise2');
const exercise3 = require('./exercise3');

module.exports = {
	name: 'Examen',
	description: 'Examen',
	durationInMinutes: 5,
	exercises: [
		exercise1,
		exercise2,
		exercise3
	]
};
