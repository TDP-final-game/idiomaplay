'use strict';

const notificationsService = require('../services/notifications/notificationsService');
const STATUS_CODES = require('../constants/status_codes.json');

const sendNotification = async (req, res) => {
	// #swagger.tags = ['User']

	const response = await notificationsService.sendNotification(req.user);
	res.status(STATUS_CODES.CREATED).send(response);
};


module.exports = {
	sendNotification
};
