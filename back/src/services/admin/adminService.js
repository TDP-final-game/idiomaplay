'use strict';

const { model: DailyAccess } = require('../../model/data/dailyAccess');
const { model: DailyUnits } = require('../../model/data/dailyUnits');
const errors = require('./errors');


const logIn = async (user, password) => {
	if((user === process.env.ADMIN_USER) && (password === process.env.ADMIN_PASSWORD))
		return { user, password };

	throw errors.UserNotRegistered();
};

const filterMaker = (startDate, endDate) => {
	const startDateObject = new Date(startDate.setHours(0, 0, 0));
	const endDateObject = new Date(endDate.setHours(0, 0, 0));
	return {
		$and: [
			{ date: { $gte: startDateObject } },
			{ date: { $lt: endDateObject } }
		]
	};
};

const getDailyAccessData = async (startDate, endDate) => {
	const filter = filterMaker(startDate, endDate);
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
	const access = new DailyAccess({ userId, date: new Date() });
	await access.save();
	return access;
};

const getUserAccessData = async (startDate, endDate) => {
	const filter = filterMaker(startDate, endDate);
	const accessDetected = await DailyAccess.find(filter, null, null);

	const accessDetectedDatesPerUser = accessDetected.reduce((data, { userId, date }) => {
		if(!data[userId])
			data[userId] = new Set(); // filters the access on the same date
		data[userId].add(new Date(date.setHours(0, 0, 0)).toISOString());
		return data;
	}, {});

	const ammountOfAccessPerUser = Object.values(accessDetectedDatesPerUser).map(data => data.size);

	const accessDetectedFormated = ammountOfAccessPerUser.reduce((data, numberOfAccessOfTheUser) => {
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

const getDailyUnitsFinished = async (startDate, endDate) => {

	const filter = filterMaker(startDate, endDate);
	const unitsDetected = await DailyUnits.find(filter, null, null);

	const unitsDetectedPerDay = unitsDetected.reduce((data, { date }) => {
		const key = new Date(date.setHours(0, 0, 0)).toISOString();
		if(!data[key])
			data[key] = 0;
		data[key] += 1;
		return data;
	}, {});

	const unitsDetectedPerDayFormatted = [];

	for(const date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
		const key = new Date(date.setHours(0, 0, 0)).toISOString();
		const unitsDetectedThatDay = unitsDetectedPerDay[key] || 0;
		unitsDetectedPerDayFormatted.push(unitsDetectedThatDay);
	}

	return unitsDetectedPerDayFormatted;
};

const getUnitAverageResolutionTime = async (startDate, endDate) => {

	const filter = filterMaker(startDate, endDate);

	const examsFinishedDetected = await DailyUnits.find(filter, null, null);

	const averageTimeOnUnitResolution = examsFinishedDetected.reduce((accum, data) => {
		accum.sumOfDurationTime += data.totalDuration;
		accum.unitsCompleted += 1;
		return accum;
	}, { sumOfDurationTime: 0, unitsCompleted: 0 });

	return averageTimeOnUnitResolution.unitsCompleted ? averageTimeOnUnitResolution.sumOfDurationTime / averageTimeOnUnitResolution.unitsCompleted : 0;
};

module.exports = {
	logIn,
	getDailyAccessData,
	getUserAccessData,
	saveAccess,
	getDailyUnitsFinished,
	getUnitAverageResolutionTime
};
