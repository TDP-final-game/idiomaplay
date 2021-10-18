'use strict';

const express = require('express');

const routers = require('./routers/index');
const generateOpenapi = require('./openapi/generate');

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

	return app;
};
