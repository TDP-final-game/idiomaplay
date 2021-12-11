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

	startDate = new Date(startDate.setHours(0, 0, 0));
	endDate = new Date(endDate.setHours(0, 0, 0));

	const filter = {
		$and: [
			{ date: { $gte: startDate } },
			{ date: { $lt: endDate } }
		]
	};

	const accessDetected = await DailyAccess.find(filter, null, null);

	const accessDetectedPerDay = accessDetected.reduce((data, { date }) => {
		const key = new Date(date.setHours(0, 0, 0)).toISOString();
		if(!data[key])
			data[key] = 0;
		data[key] += 1;
		return data;
	}, {});

	const accessDetectedFormatted = [];

	for(const date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
		const key = new Date(date.setHours(0, 0, 0)).toISOString();
		const accessDetectedThatDay = accessDetectedPerDay[key] || 0;
		accessDetectedFormatted.push(accessDetectedThatDay);
	}

	return accessDetectedFormatted;
};

const saveAccess = async userId => {

	return new DailyAccess({
		userId,
		date: new Date()
	});
};

const getUserAccessData = async (startDate, endDate) => {

	startDate = new Date(startDate.setHours(0, 0, 0));
	endDate = new Date(endDate.setHours(0, 0, 0));

	const filter = {
		$and: [
			{ date: { $gte: startDate } },
			{ date: { $lt: endDate } }
		]
	};

	const accessDetected = await DailyAccess.find(filter, null, null);

	const accessDetectedDatesPerUser = accessDetected.reduce((data, { user, date }) => {
		if(!data[user])
			data[user] = new Set(); // filters the access on the same date
		data[user].add(new Date(date.setHours(0, 0, 0)).toISOString());
		return data;
	}, {});

	const ammountOfAccessPerUserPerDate = Object.values(accessDetectedDatesPerUser).map(data => data.length);

	const accessDetectedFormated = ammountOfAccessPerUserPerDate.reduce((data, numberOfAccessOfTheUser) => {
		if(numberOfAccessOfTheUser >= 20)
			data.daily += 1;
		else if(numberOfAccessOfTheUser >= 7)
			data.weekly += 1;
		else
			data.monthly += 1;
		return data;
	}, { daily: 0, weekly: 0, monthly: 0 });

	return [accessDetectedFormated.daily, accessDetectedFormated.weekly, accessDetectedFormated.monthly];

};

module.exports = {
	logIn,
	getDailyAccessData,
	getUserAccessData,
	saveAccess
};
