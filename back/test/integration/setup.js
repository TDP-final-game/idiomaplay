'use strict';


const path = require('path');

const file = path.join(__dirname, '.env.test');
require('dotenv').config({ path: file });

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');
const AppWrapper = require('./support/app');
const connectToMongo = require('../../src/startup/db');

chai.use(chaiHttp);

exports.mochaHooks = {
	async beforeAll() {
		process.env.DATABASE_URL = process.env.DATABASE_URL.replace('idiomaplay', 'idiomaplaytest');
		this.mongo = await connectToMongo();
		this.app = new AppWrapper({
			chaiApp: chai.request(await app()).keepOpen(),
			baseUrl: '/api/v1'
		});
	},
	async afterEach() {
		await this.mongo.connection.db.dropDatabase();
	},
	async afterAll() {
		await this.app.chaiApp.close();
		await this.mongo.disconnect();
	}
};
