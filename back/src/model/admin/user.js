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
	password: {
		type: String,
		required: true
	}
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

/*
 * Instance methods
 */
User.methods.validPassword = function(password) {
	return this.password === password;
};

module.exports = {
	schema: User,
	model: mongoose.model('AdminUser', User)
};
