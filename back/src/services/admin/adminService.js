'use strict';

const { model: DailyAccess } = require('../../model/data/dailyAccess');
const { model: User } = require('../../model/users/user');
const errors = require('./errors');
const deleteDaysFromDate = require('../../utils/delete-days-from-date');


const logIn = async (user, password) => {
	if((user === process.env.ADMIN_USER) && (password === process.env.ADMIN_PASSWORD))
		return { user, password };

	throw errors.UserNotRegistered();
};

const getDailyAccessData = async (startDate, endDate) => {

	const filter = {
		$and: [
			{ date: { $gte: new Date(startDate.setHours(0, 0, 0)) } },
			{ date: { $lt: new Date(endDate.setHours(0, 0, 0)) } }
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

	const dailyFilter = { lastAccess: { $gte: deleteDaysFromDate(7, new Date(new Date().setHours(0, 0, 0))) } };
	const weeklyFilter = {
		$and: [
			{ lastAccess: { $lte: deleteDaysFromDate(7, new Date(new Date().setHours(0, 0, 0))) } },
			{ lastAccess: { $gte: deleteDaysFromDate(30, new Date(new Date().setHours(0, 0, 0))) } }
		]
	};
	const monthlyFilter = { lastAccess: { $lte: deleteDaysFromDate(30, new Date(new Date().setHours(0, 0, 0))) } };

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
	getUserAccessData,
	saveAccess
};
