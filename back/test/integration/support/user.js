'use strict';

class User {

	constructor(app) {
		this.app = app;
	}

	async create({ email, firstName, lastName }) {
		return this.app.post('/users')
			.set('Authorization', email)
			.send({ firstName, lastName });
	}

	async login({ email }) {
		return this.app.post('/users/session')
			.set('Authorization', email)
			.send({});
	}
}

module.exports = User;
