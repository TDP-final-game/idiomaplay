'use strict';

class Reward {
	constructor({ coins = 0, lives = 0 }) {
		this.coins = coins;
		this.lives = lives;
	}

	toJSON() {
		return this;
	}
}

module.exports = Reward;
