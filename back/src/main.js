'use strict';

require('dotenv').config();

const connectToMongo = require('./startup/db');
const createChallenge = require('./startup/createChallenge');
const appCallback = require('./app');

const main = async () => {
	const app = await appCallback();
	const port = process.env.PORT || 3000;
	let result = await app.listen(port);

	await connectToMongo();

	if(process.env.CREATE_CHALLENGE) {
		try {
			result = await createChallenge();
		} catch(e) {
			// eslint-disable-next-line no-console
			console.error('Challenge not created!', e);
		}
	}

	return result;
};

if(require.main === module)
	main();


module.exports = main;
