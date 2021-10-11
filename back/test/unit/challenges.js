'use strict';

const chai = require('chai');

const { expect } = chai;

describe('/challenges', () => {
	describe('something', () => {
		it('array test', () => {
			expect([1, 2, 3].indexOf(4)).to.equal(-1);
		});
	});
});
