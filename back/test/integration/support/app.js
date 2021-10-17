'use strict';

class App {

	constructor({ chaiApp, baseUrl = '' }) {
		this.chaiApp = chaiApp;
		this.baseUrl = baseUrl;
	}

	get(url) {
		return this.chaiApp.get(`${this.baseUrl}${url}`);
	}

	post(url) {
		return this.chaiApp.post(`${this.baseUrl}${url}`);
	}

	put(url) {
		return this.chaiApp.put(`${this.baseUrl}${url}`);
	}

	delete(url) {
		return this.chaiApp.delete(`${this.baseUrl}${url}`);
	}
}

module.exports = App;
