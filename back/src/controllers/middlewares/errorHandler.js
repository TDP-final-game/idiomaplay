'use strict';

// eslint-disable-next-line no-unused-vars
const errorHandler = async (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;

	res.status(err.statusCode).send({
		message: err.message
	});
};

module.exports = errorHandler;
