'use strict';

const userService = require('../services/users/userService');
const STATUS_CODES = require('../constants/status_codes.json');

const createUser = async (req, res) => {
	// #swagger.tags = ['User']

	const createdUser = await userService.createUser(req.body);
	res.status(STATUS_CODES.CREATED).send(createdUser);
};

const logIn = async (req, res) => {
	// #swagger.tags = ['User']

	const foundUser = await userService.logIn(req.body);
	res.status(STATUS_CODES.OK).send(foundUser);
};

const list = async (req, res) => {
	// #swagger.tags = ['User']

	const [from, to] = JSON.parse(req.query.range);
	const [sortField, sortOrder] = JSON.parse(req.query.sort);
	const { q: query } = JSON.parse(req.query.filter);

	const { users, total } = await userService.list({
		from,
		to,
		sortField,
		sortOrder,
		query
	});

	res.status(STATUS_CODES.OK)
		.header('Content-Range', total)
		.set('Access-Control-Expose-Headers', 'Content-Range')
		.send(users);
};

const get = async (req, res) => {
	// #swagger.tags = ['User']

	const { userId } = req.params;
	const user = await userService.get(userId);
	res.status(STATUS_CODES.OK).send(user);
};

const update = async (req, res) => {
	// #swagger.tags = ['User']

	const { userId } = req.params;
	const user = await userService.update({ ...req.body, id: userId });
	res.status(STATUS_CODES.OK).send(user);
};

const listChallengesAttempts = async (req, res) => {
	// #swagger.tags = ['User']

	try {
		const { user } = req;

		const response = await userService.listChallengeAttempts(user._id);

		res.status(STATUS_CODES.OK)
			.send(response);
	} catch(error) {
		return res.status(error.statusCode).send(error.description);
	}
};

const getStats = async (req, res) => {
	// #swagger.tags = ['User']
	const { user } = req;
	const stats = await userService.getStats({ userId: user._id });
	res.status(STATUS_CODES.OK).send(stats);
};

module.exports = {
	createUser,
	logIn,
	list,
	get,
	update,
	listChallengesAttempts,
	getStats
};
