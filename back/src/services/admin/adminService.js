'use strict';

const { model: AdminUser } = require('../../model/admin/user');
const errors = require('./errors');

const createUser = async (email, password) => {
	const user = await AdminUser.findOne({ email });
	if(user)
		throw errors.UserAlreadyRegistered();

	return (new AdminUser({ email, password })).save();
};

const logIn = async (email, password) => {
	const user = await AdminUser.findOne({ email });
	if(!user)
		throw errors.UserNotRegistered();
	if(!user.validPassword(password))
		throw errors.UserNotRegistered();
	return user;
};

const list = async () => {
	return AdminUser.find();
};

module.exports = {
	createUser,
	logIn,
	list
};
