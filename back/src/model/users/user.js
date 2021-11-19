'use strict';

const mongoose = require('mongoose');
const { schema: Stats } = require('./stats');

const User = new mongoose.Schema({
	email: {
		type: String,
		trim: true,
		lowercase: true,
		index: { unique: true },
		required: [true, 'Email address is required'],
		match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
	},
	firstName: {
		type: String,
		required: [true, 'first name is required']
	},
	lastName: {
		type: String,
		required: [true, 'last name is required']
	},
	photo: {
		type: String
	},
	stats: {
		type: Stats,
		required: true,
		default: () => ({})
	},
	enabled: {
		type: Boolean,
		required: true,
		default: true
	},
	expoPushToken: {
		type: String, // TODO: VERIFY THIS IF IT IS A DAY
		required: false
	},
	lastAccess: {
		type: Date
	}
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

/*
 * Instance methods
 */
User.methods.addReward = function(reward) {
	this.stats.addReward(reward);
};

User.methods.exchangeCoinsForLives = function() {
	this.stats.exchangeCoinsForLives();
};

module.exports = {
	schema: User,
	model: mongoose.model('User', User)
};
