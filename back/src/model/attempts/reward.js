'use strict';

class Reward {
	constructor({ coins = 0, lives = 0 }) {
		this.coins = coins;
		this.lives = lives;
	}
}

module.exports = Reward;
