'use strict';

const adminUserService = require('../services/admin/adminService');
const STATUS_CODES = require('../constants/status_codes.json');
const deleteDaysFromDate = require('../utils/delete-days-from-date');

const logIn = async (req, res) => {
	// #swagger.tags = ['AdminUser']

	const { user, password } = req.body;
	const foundUser = await adminUserService.logIn(user, password);
	res.status(STATUS_CODES.OK).send(foundUser);
};

const getDailyAccessData = async (req, res) => {

	const startDate = req.query.params.startDate || new Date();
	const endDate = req.query.params.endDate || deleteDaysFromDate(7, new Date());

	if(startDate > endDate)
		return res.status(STATUS_CODES.BAD_REQUEST).send({ message: 'Start date should be less than end date' });

	res.status(STATUS_CODES.OK).send(await adminUserService.getDailyAccessData(startDate, endDate));
};

const getUserAccessData = async (req, res) => {
	res.status(STATUS_CODES.OK).send(await adminUserService.getUserAccessData());
};

module.exports = {
	logIn,
	getDailyAccessData,
	getUserAccessData
};
