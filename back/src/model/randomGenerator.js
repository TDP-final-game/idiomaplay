/* eslint-disable */

// Magic: https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
function mulberry32(a) {
	return function() {
		let t = a += 0x6D2B79F5;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}

class RandomGenerator {
	constructor(seed = process.env.SEED || Date.now()) {
		this.algorithm = mulberry32(seed);
	}

	new() {
		return this.algorithm()
	}
}

module.exports = new RandomGenerator();
