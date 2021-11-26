'use strict';

const notificationsService = require('../services/notifications/notificationsService');
const STATUS_CODES = require('../constants/status_codes.json');

const sendNotification = async (req, res) => {
	// #swagger.tags = ['User']

	const responses = await Promise.all([
		notificationsService.sendDailyNotification(),
		notificationsService.sendWeeklyNotifications(),
		notificationsService.sendMonthlyNotifications()]);

	res.status(STATUS_CODES.CREATED).send(responses);
};


module.exports = {
	sendNotification
};
