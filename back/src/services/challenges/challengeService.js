'use strict';

const { model: challengeModel } = require('../../model/challenges/challenge');
const { model: challengeAttemptModel } = require('../../model/attempts/challengeAttempt');

const errors = require('./errors');

const { pageSize } = require('../../constants/pagination_default.json');

const findChallenge = challengeId => {
	return challengeModel.findOne({ _id: challengeId });
};

const listChallenges = async ({ pageNumber = 0, language }) => {
	let filters = {};
	if(language)
		filters = { language };
	return challengeModel.find(filters).skip(pageNumber * pageSize)
		.limit(pageSize);
};

const deleteChallenges = () => {
	return challengeModel.deleteMany();
};

const deleteChallenge = async challengeId => {
	const challenge = await findChallenge(challengeId);
	if(!(challenge.units.length === 0))
		throw errors.ChallengeNotDeletable('Please delete all units before deleting challenge');

	const challengeAttempts = await challengeAttemptModel.find({ challenge: challengeId });
	if(challengeAttempts.length !== 0)
		throw errors.ChallengeNotDeletable('Challenge already attempted');

	const deletedChallenge = await challengeModel.deleteOne({ _id: challengeId });
	return deletedChallenge;
};

const deleteUnit = async (challengeId, unitOrderNumber) => {
	const challenge = await findChallenge(challengeId);
	const unit = challenge.getUnit(unitOrderNumber);

	if (!(unit.lessons.length === 0))
		throw errors.UnitNotDeletable('Please delete all lessons before deleting unit');

	const challengeAttempts = await challengeAttemptModel.find({ challenge: challengeId });
	if(challengeAttempts.length !== 0)
		throw errors.UnitNotDeletable('The challenge which unit belongs has been already started');

	challenge.units = challenge.units.filter(unitElem => unitElem.orderNumber !== unitOrderNumber);
	await challenge.save();

	return unit;
};


const createChallenge = async challengeData => {
	return challengeModel.create({
		name: challengeData.name,
		description: challengeData.description,
		difficulty: challengeData.difficulty,
		language: challengeData.language
	});
};

const addUnit = async (challengeId, unitData) => {
	const challenge = await challengeModel.findOne({ _id: challengeId });

	challenge.units.push({

		orderNumber: unitData.orderNumber,
		name: unitData.name,
		description: unitData.description

	});
	return challenge.save();
};

const addLesson = async (challengeId, unitOrderNumber, lessonData) => {
	const challenge = await challengeModel.findOne({ _id: challengeId });
	const unit = challenge.units.find(unitToUpdate => unitToUpdate.orderNumber === unitOrderNumber);

	unit.lessons.push({
		name: lessonData.name,
		description: lessonData.description,
		orderNumber: lessonData.orderNumber
	});

	return challenge.save();
};

const addExam = async (challengeId, unitOrderNumber, examData) => {
	const challenge = await challengeModel.findOne({ _id: challengeId });
	const unit = challenge.units.find(unitToUpdate => unitToUpdate.orderNumber === unitOrderNumber);

	unit.exam = {
		name: examData.name,
		description: examData.description,
		durationInMinutes: examData.durationInMinutes
	};

	return challenge.save();
};

const getExam = async (challengeId, unitOrderNumber) => {
	const challenge = await challengeModel.findOne({ _id: challengeId });
	const unit = challenge.units.find(someUnit => someUnit.orderNumber === unitOrderNumber);
	return unit.exam;
};

const addExerciseToLesson = async (challengeId, unitOrderNumber, lessonOrderNumber, exercise) => {
	const challenge = await challengeModel.findOne({ _id: challengeId });
	const unit = challenge.units.find(someUnit => someUnit.orderNumber === unitOrderNumber);
	const lesson = unit.lessons.find(someLesson => someLesson.orderNumber === lessonOrderNumber);
	lesson.exercises.push(exercise);
	return challenge.save();
};

const addExerciseToExam = async (challengeId, unitOrderNumber, exercise) => {
	const challenge = await challengeModel.findOne({ _id: challengeId });
	const unit = challenge.units.find(unitToUpdate => unitToUpdate.orderNumber === unitOrderNumber);
	unit.exam.exercises.push(exercise);
	return challenge.save();
};

const listChallengeAttempts = challengeId => {
	return challengeAttemptModel.find({ challenge: challengeId });
};

module.exports = {
	findChallenge,
	listChallenges,
	createChallenge,
	addUnit,
	addLesson,
	addExam,
	getExam,
	addExerciseToLesson,
	addExerciseToExam,
	deleteChallenges,
	listChallengeAttempts,
	deleteChallenge, 
	deleteUnit
};
