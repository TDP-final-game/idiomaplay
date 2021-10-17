'use strict';

const { model: userModel } = require('../model/users/user');
const { model: challengeAttemptModel } = require('../model/attempts/challengeAttempt');
const firebaseUser = require('./firebaseService');

const createUser = async accessToken => {

	const user = await firebaseUser.getUserInformation(accessToken);

	return userModel.create(user);
};

const logIn = async accessToken => {

	// todo: con el token de google, recibimos la info del usuairo y podemos validar mediante el mail si se loggeo antes o no.

	const userInformation = await firebaseUser.getUserInformation(accessToken);

	if(!userInformation) {
		// not found user;
	}


	const user = await userModel.findBy({ email: userInformation.email });
	if(!user) {
		// user should login;
	}

	return user; // TODO: probably should return our access token
};
const listChallengeAttempts = userId => {
	return challengeAttemptModel.find({ userId });
};

module.exports = {
	listChallengeAttempts,
	createUser,
	logIn
};
