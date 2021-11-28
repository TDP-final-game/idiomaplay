'use strict';

class User {

	constructor(app) {
		this.app = app;
	}

	async create({ email, firstName, lastName }) {
		const result = await this.app.post('/users')
			.send({ email, firstName, lastName });
		this.app.authenticate(result.body.id);
		return result;
	}

	async login({ email }) {
		const result = await this.app.post('/users/session')
			.send({ email });
		this.app.authenticate(result.body.id);
		return result;
	}

	stats() {
		return this.app.get('/users/me/stats');
	}
}

module.exports = User;
