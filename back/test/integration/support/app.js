'use strict';

class App {
	constructor({ chaiApp, baseUrl = '' }) {
		this.chaiApp = chaiApp;
		this.baseUrl = baseUrl;
		this.headers = new Map();
	}

	_addHeaders(req) {
		this.headers.forEach((value, name) => {
			req.set(name, value);
		});
		return req;
	}

	get(url) {
		return this._addHeaders(this.chaiApp.get(`${this.baseUrl}${url}`));
	}

	post(url) {
		return this._addHeaders(this.chaiApp.post(`${this.baseUrl}${url}`));
	}

	put(url) {
		return this._addHeaders(this.chaiApp.put(`${this.baseUrl}${url}`));
	}

	delete(url) {
		return this._addHeaders(this.chaiApp.delete(`${this.baseUrl}${url}`));
	}

	authenticate(userId) {
		this.headers.set('Authorization', `userId ${userId}`);
	}

	deAuthenticate() {
		this.headers.delete('Authorization');
	}
}

module.exports = App;
