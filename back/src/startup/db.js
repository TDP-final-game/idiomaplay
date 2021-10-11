'use strict';

const mongoose = require('mongoose');

module.exports = () => {
	// const result = mongoose.connect(process.env.DATABASE_URL, {
	// 	useNewUrlParser: true,
	// 	useUnifiedTopology: true
	// });

	const result = mongoose.connect('mongodb+srv://maguimarijuan:chanchoperro22@cluster0.atm46.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	const db = mongoose.connection;
	db.on('error', console.error.bind(console, 'db connection error: '));
	db.once('open', () => {
		console.log('db connected successfully');
	});

	return result;
};
