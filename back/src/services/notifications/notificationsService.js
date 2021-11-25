'use strict';

const { Expo } = require('expo-server-sdk');
// eslint-disable-next-line import/no-extraneous-dependencies
const cron = require('node-cron');
const { model: User } = require('../../model/users/user');


const sendNotifications = async (filter, message) => {

	const users = await User.find(filter, null, null);

	const expo = new Expo();

	const messages = users.map(({ expoPushToken }) => {

		if(!Expo.isExpoPushToken(expoPushToken)) {
			console.error(`Push token ${expoPushToken} is not a valid Expo push token`);
			return;
		}

		return { ...message, to: expoPushToken };
	});
	messages.push();

	const chunks = expo.chunkPushNotifications(messages);
	const tickets = [];
	(async () => {
		for(const chunk of chunks) {
			try {
				const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
				tickets.push(...ticketChunk);
			} catch(error) {
				console.error(error);
			}
		}
	})();

	await Promise.all(users.map(async user => {
		user.lastNotificationSentDate = Date.now();
		return user.save();
	}));
	return { messages };
};

const deleteDaysFromDate = (days, date) => {
	const newDate = new Date(date);
	newDate.setDate(date.getDate() - days);
	return newDate;
};

const sendDailyNotification = async () => {

	// Si la última actividad se detectó hace menos de cinco días y la última notificación la mandé hace mas de un día
	const filter = {
		$and: [
			{ lastActivityDetected: { $gte: deleteDaysFromDate(5, new Date(new Date().setHours(0, 0, 0))) } },
			{ lastNotificationSentDate: { $lt: new Date(new Date().setHours(0, 0, 0)) } }
		]
	};

	const message = {
		sound: 'default',
		body: 'Sigue aprendiendo, estás cerca de cumplir tus objetivos'
	};

	return sendNotifications(filter, message);
};

const sendWeeklyNotifications = async () => {

	// Si la última actividad se detectó hace menos de siete días y la última notificación la mandé hace mas de siete días
	const filter = {
		$and: [
			{
				lastActivityDetected: {
					$gte: deleteDaysFromDate(30, new Date(new Date().setHours(0, 0, 0))),
					$lte: deleteDaysFromDate(5, new Date(new Date().setHours(0, 0, 0)))
				}
			},
			{ lastNotificationSentDate: { $lt: deleteDaysFromDate(7, new Date(new Date().setHours(0, 0, 0))) } }
		]
	};

	const message = {
		sound: 'default',
		body: 'Te extrañamos! Sigue tomando desafíos!'
	};

	return sendNotifications(filter, message);
};

const sendMonthlyNotifications = async () => {

	// Si la última actividad se detectó hace más de un mes y la última notificación la mandé hace mas de un mes
	const filter = {
		$and: [
			{
				lastActivityDetected: {
					$lte: deleteDaysFromDate(60, new Date(new Date().setHours(0, 0, 0)))
				}
			},
			{ lastNotificationSentDate: { $lt: deleteDaysFromDate(30, new Date(new Date().setHours(0, 0, 0))) } }
		]
	};

	const message = {
		sound: 'default',
		body: 'Holaa! Te extrañamos! Sigue tomando desafíos!'
	};

	return sendNotifications(filter, message);
};

const start = async () => {
	cron.schedule('* * * * *', async () => {
		await Promise.all([
			sendDailyNotification(),
			sendWeeklyNotifications(),
			sendMonthlyNotifications()]);
	});
};


module.exports = {
	sendDailyNotification,
	sendWeeklyNotifications,
	sendMonthlyNotifications,
	start
};
