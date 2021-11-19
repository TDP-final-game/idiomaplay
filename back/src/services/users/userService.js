'use strict';

const { model: User } = require('../../model/users/user');
const { model: challengeAttemptModel } = require('../../model/attempts/challengeAttempt');
const errors = require('./usersErrors');

const createUser = async ({ email, ...props }) => {
	const user = await User.findOne({ email });
	if(user)
		throw errors.UserAlreadyRegistered();

	return (new User({ email, ...props })).save();
};

const logIn = async ({ email }) => {
	const user = await User.findOne({ email });
	if(!user)
		throw errors.UserNotRegistered();
	return user;
};

const list = async ({
	from, to, sortField, sortOrder, query
}) => {
	const options = {
		skip: from,
		limit: to - from + 1,
		sort: {
			[sortField]: sortOrder === 'ASC' ? -1 : 1
		}
	};
	const regex = query ?
		new RegExp(`(${query.trim().split(' ')
			.join('|')})`, 'gi')
		: /.*/;
	const filter = {
		$or: [
			{ email: { $regex: regex } },
			{ firstName: { $regex: regex } },
			{ lastName: { $regex: regex } }
		]
	};

	return {
		users: await User.find(filter, null, options),
		total: await User.countDocuments(filter)
	};
};

const get = async userId => {
	return User.findOne({ _id: userId });
};

const update = async ({ id, enabled }) => {
	const user = await User.findOne({ _id: id });
	user.enabled = enabled;
	return user.save();
};

const listChallengeAttempts = user => {
	return challengeAttemptModel.find({ user });
};

const getStats = async ({ userId }) => {
	const user = await User.findOne({ _id: userId });
	if(!user)
		throw errors.UserNotRegistered();
	return user.stats;
};

const exchangeCoinsForLives = async ({ userId }) => {
	const user = await User.findOne({ _id: userId });
	user.exchangeCoinsForLives();
	return user.save().stats;
};

module.exports = {
	createUser,
	logIn,
	list,
	get,
	update,
	listChallengeAttempts,
	getStats,
	exchangeCoinsForLives
};
