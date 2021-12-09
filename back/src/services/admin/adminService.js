'use strict';

const { model: DailyAccess } = require('../../model/data/dailyAccess');
const { model: User } = require('../../model/users/user');
const errors = require('./errors');

const logIn = async (user, password) => {
	if((user === process.env.ADMIN_USER) && (password === process.env.ADMIN_PASSWORD))
		return { user, password };

	throw errors.UserNotRegistered();
};

const getDailyAccessData = async (startDate, endDate) => {

	const filter = {
		$and: [
			{ date: { $gte: startDate } },
			{ date: { $lt: endDate } }
		]
	};

	return DailyAccess.find(filter, null, null);
};

const saveAccess = async userId => {

	return new DailyAccess({
		userId,
		date: new Date()
	});
};

const getUserAccessData = async () => {

	const dailyFilter = [];
	const weeklyFilter = [];
	const monthlyFilter = [];

	const [dailyAccess, weeklyAccess, monthlyAccess] = await Promise.all([
		User.find(dailyFilter, null, null),
		User.find(weeklyFilter, null, null),
		User.find(monthlyFilter, null, null)
	]);

	return { dailyAccess: dailyAccess.length, weeklyAccess: weeklyAccess.length, monthlyAccess: monthlyAccess.length };

};

module.exports = {
	logIn,
	getDailyAccessData,
	saveAccess
};
