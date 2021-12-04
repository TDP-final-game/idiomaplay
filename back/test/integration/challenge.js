'use strict';

const chai = require('chai');

const { expect } = chai;

const ChallengeExample = require('./support/challenge');
const UserExample = require('./support/user');

describe('/challenges', () => {
	// Authentication
	beforeEach(async function() {
		const userExample = new UserExample(this.app);
		await userExample.create({
			email: 'test@test.com',
			firstName: 'Test firstName',
			lastName: 'Test lastName'
		});
	});

	describe('GET /', () => {
		it('should return an empty list when there are no challenges', async function() {
			const challengeExample = new ChallengeExample(this.app);
			const result = await challengeExample.list();
			expect(result).to.have.status(200);
			expect(result.body).to.eql([]);
		});

		xit('should return the challenges when there are some', async function() {
			const challengeExample = new ChallengeExample(this.app);
			const challenge = await challengeExample.create();
			const result = await challengeExample.list();
			expect(result).to.have.status(200);
			expect(result.body).to.deep.equal([challenge]);
		});
	});

	describe('GET /:challengeId', () => {
		it('should return the challenge', async function() {
			const challengeExample = new ChallengeExample(this.app);

			const challenge = await challengeExample.create();
			const result = await challengeExample.get({ challengeId: challenge.id });

			expect(result).to.have.status(200);
			expect(result.body).to.deep.equal(challenge);
		});
	});
});
