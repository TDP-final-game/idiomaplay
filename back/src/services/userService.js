'use strict';

const { model: userModel } = require('../model/users/user');
const { model: challengeAttemptModel } = require('../model/attempts/challengeAttempt');

const createUser = user => {
	return userModel.create(user);
};

const logIn = user => {

	// todo: con el token de google, recibimos la info del usuairo y podemos validar mediante el mail si se loggeo antes o no.
	return userModel.create(user);
};
const listChallengeAttempts = userId => {
	return challengeAttemptModel.find({ userId });
};

module.exports = {
	listChallengeAttempts,
	createUser,
	logIn
};
