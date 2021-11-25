'use strict';

const mongoose = require('mongoose');
const errors = require('./errors');

const Stats = new mongoose.Schema({
	_id: false,
	coins: {
		type: Number,
		required: true,
		default: 80
	},
	lives: {
		type: Number,
		required: true,
		default: 5
	}
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

/*
 * Instance methods
 */
Stats.methods.addReward = function(reward) {
	this.coins += reward.coins;
	this.lives = Math.max(5, this.lives + reward.lives);
};

Stats.methods.exchangeCoinsForLives = function() {
	if(this.coins < 100)
		throw errors.NotEnoughCoins();
	else if(this.lives >= 5)
		throw errors.MaxLivesAlreadyReached();
	this.coins -= 100;
	this.lives += 1;
};

module.exports = {
	schema: Stats
};
