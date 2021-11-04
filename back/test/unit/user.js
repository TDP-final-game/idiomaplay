'use strict';

const chai = require('chai');

const { expect } = chai;
const { model: User } = require('../../src/model/users/user');

describe('user', () => {
	it('should have 80 coins and 5 lives when created', () => {
		const user = new User({
			email: 'test@test.com',
			firstName: 'Test firstName',
			lastName: 'Test lastName'
		});
		expect(user.stats.coins).to.eql(80);
		expect(user.stats.lives).to.eql(5);
	});
});
