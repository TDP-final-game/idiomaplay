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

const logIn = async email => {
	const user = await User.findOne({ email });
	if(!user)
		throw errors.UserNotRegistered();
	return user;
};

const getUserInfo = async email => {
	return User.findOne({ email });
};

const listChallengeAttempts = user => {
	return challengeAttemptModel.find({ user });
};

module.exports = {
	listChallengeAttempts,
	createUser,
	logIn,
	getUserInfo
};
