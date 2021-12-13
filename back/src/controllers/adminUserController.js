'use strict';

const adminUserService = require('../services/admin/adminService');
const STATUS_CODES = require('../constants/status_codes.json');
const parseStartDateEndDate = require('../utils/parse-start-end-date');

const logIn = async (req, res) => {
	// #swagger.tags = ['AdminUser']

	const { user, password } = req.body;
	const foundUser = await adminUserService.logIn(user, password);
	res.status(STATUS_CODES.OK).send(foundUser);
};

const getDailyAccessData = async (req, res) => {

	const { startDate, endDate } = parseStartDateEndDate(req.query.startDate);
	res.status(STATUS_CODES.OK).send(await adminUserService.getDailyAccessData(startDate, endDate));
};

const getUserAccessData = async (req, res) => {

	const { startDate, endDate } = parseStartDateEndDate(req.query.startDate);
	res.status(STATUS_CODES.OK).send(await adminUserService.getUserAccessData(startDate, endDate));
};

const getDailyUnitsFinished = async (req, res) => {

	const { startDate, endDate } = parseStartDateEndDate(req.query.startDate);
	res.status(STATUS_CODES.OK).send(await adminUserService.getDailyUnitsFinished(startDate, endDate));
};

const getUnitAverageResolutionTime = async (req, res) => {

	const { startDate, endDate } = parseStartDateEndDate(req.query.startDate);
	res.status(STATUS_CODES.OK).send(await adminUserService.getUnitAverageResolutionTime(startDate, endDate));
};


module.exports = {
	logIn,
	getDailyAccessData,
	getUserAccessData,
	getDailyUnitsFinished,
	getUnitAverageResolutionTime
};
