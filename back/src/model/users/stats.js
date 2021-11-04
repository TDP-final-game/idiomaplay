'use strict';

const mongoose = require('mongoose');

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
	this.lives += reward.lives;
};

module.exports = {
	schema: Stats
};