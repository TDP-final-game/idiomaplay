'use strict';

class User {

	constructor(app) {
		this.app = app;
	}

	async create({ email, firstName, lastName }) {
		const result = await this.app.post('/users')
			.set('Authorization', email)
			.send({ firstName, lastName });
		this.app.authenticate(result.body.id);
		return result;
	}

	async login({ email }) {
		const result = await this.app.post('/users/session')
			.set('Authorization', email)
			.send({});
		this.app.authenticate(result.body.id);
		return result;
	}
}

module.exports = User;
