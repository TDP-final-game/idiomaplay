'use strict';

const express = require('express');
require('express-async-errors');

const routers = require('./routers/index');
const generateOpenapi = require('./openapi/generate');
const errorHandler = require('./controllers/middlewares/errorHandler');

module.exports = async () => {
	const app = express();
	app.use(express.json());

	/*
	 * Api
	 */
	app.use('/api/v1', routers);

	/*
	 * Health
	 */
	app.get('/healthz', (req, res) => {
		res.send('hi!');
	});

	/*
	 * Openapi
	 */
	app.use('/api-docs', await generateOpenapi());

	/*
	 * Error handler
	 */
	app.use(errorHandler);

	return app;
};
