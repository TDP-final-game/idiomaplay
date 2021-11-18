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

const list = async ({ from, to, sortField, sortOrder }) => {
	const options = {
		skip: from,
		limit: to - from + 1,
		sort: {
			[sortField]: sortOrder === 'ASC' ? -1 : 1
		}
	};
	return {
		users: await User.find({}, null, options),
		total: await User.countDocuments()
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

module.exports = {
	createUser,
	logIn,
	list,
	get,
	update,
	listChallengeAttempts,
	getStats
};
