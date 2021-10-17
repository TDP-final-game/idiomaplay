'use strict';

const STATUS_CODES = require('../../constants/status_codes.json');

module.exports = (err, _, res) => {
	console.error(err.stack);
	const resp = { message: err.message };
	if(process.env.NODE_ENV === 'development')
		resp.trace = err.stack;

	res.status(err.status || STATUS_CODES.INTERNAL_SERVER_ERROR).send(resp);
};
