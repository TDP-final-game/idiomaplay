'use strict';

const mongoose = require('mongoose');

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
	coins: {
		type: Number,
		default: 80
	},
	lives: {
		type: Number,
		default: 5
	}
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = {
	schema: User,
	model: mongoose.model('User', User)
};
