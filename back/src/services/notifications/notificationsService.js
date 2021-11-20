'use strict';

const { Expo } = require('expo-server-sdk');
const { model: User } = require('../../model/users/user');

const sendNotification = async ({ email }) => {

	const { expoPushToken } = await User.findOne({ email });

	const expo = new Expo();

	if(!Expo.isExpoPushToken(expoPushToken)) {
		console.error(`Push token ${expoPushToken} is not a valid Expo push token`);
		return;
	}
	const messages = [];
	messages.push({
		to: expoPushToken,
		sound: 'default',
		body: 'TESTING - SENDING NOTIFICATION'
	});

	const chunks = expo.chunkPushNotifications(messages);
	const tickets = [];
	(async () => {
		for(const chunk of chunks) {
			try {
				const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
				console.log(ticketChunk);
				tickets.push(...ticketChunk);
				// https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
			} catch(error) {
				console.error(error);
			}
		}
	})();

	return { message: 'NOTIFICATION SEND' };
};

module.exports = {
	sendNotification
};
