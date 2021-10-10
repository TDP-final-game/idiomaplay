const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app')
const connectToMongo = require('../../src/startup/db');

chai.use(chaiHttp);

exports.mochaHooks = {
  async beforeAll() {
    process.env.DATABASE_URL = process.env.DATABASE_URL.replace('idiomaplay', 'idiomaplaytest')
    this.mongo = await connectToMongo();
    this.app = chai.request(await app()).keepOpen()
  },
  async afterEach() {
    await this.mongo.connection.db.dropDatabase();
  },
  async afterAll() {
    await this.app.close()
    await this.mongo.disconnect()
  }
};
