'use strict';

const chai = require('chai');

const { expect } = chai;

const UserExample = require('./support/user');

describe('/users', () => {
	let userExample;
	const user = {
		email: 'test@test.com',
		firstName: 'Test firstName',
		lastName: 'Test lastName'
	};

	before(function() {
		userExample = new UserExample(this.app);
	});

	describe('POST /', () => {
		it('should create a user', async () => {
			const result = await userExample.create(user);
			expect(result).to.have.status(201);
			expect(result.body).to.include(user);
		});
	});

	describe('POST /session', () => {
		it('should create a session', async () => {
			await userExample.create(user);
			const result = await userExample.login({ email: user.email });
			expect(result).to.have.status(200);
			expect(result.body).to.include(user);
		});

		it('should fail if user doesn\'t exist', async () => {
			const result = await userExample.login({ email: user.email });
			expect(result).to.have.status(401);
			expect(result.body.message).to.include('User not registered');
		});
	});

	describe('GET /stats', () => {
		it('should return 80 coins and 5 lives on user creation', async () => {
			await userExample.create(user);
			const result = await userExample.stats();
			expect(result).to.have.status(200);
			expect(result.body).to.eql({ coins: 80, lives: 5 });
		});
	});
});
